import bpy
import json
import os
import sys
from mathutils import Vector


def material_names(obj):
    return [slot.material.name if slot.material else "" for slot in obj.material_slots]


def scene_bounds(meshes):
    points = []
    for obj in meshes:
        if not obj.data.vertices:
            continue
        points.extend(obj.matrix_world @ Vector(corner) for corner in obj.bound_box)
    if not points:
        zero = Vector((0.0, 0.0, 0.0))
        return zero, zero
    minimum = Vector(tuple(min(point[index] for point in points) for index in range(3)))
    maximum = Vector(tuple(max(point[index] for point in points) for index in range(3)))
    return minimum, maximum


def geometry_stats(meshes):
    vertices = 0
    triangles = 0
    shell_negative_x = 0
    shell_positive_x = 0
    shell_center_x = 0

    for obj in meshes:
        vertices += len(obj.data.vertices)
        obj.data.calc_loop_triangles()
        triangles += len(obj.data.loop_triangles)

        searchable = " ".join([obj.name, *material_names(obj)]).lower()
        if not any(token in searchable for token in ("body", "sticker", "visor")):
            continue
        for vertex in obj.data.vertices:
            x = (obj.matrix_world @ vertex.co).x
            if x < -0.01:
                shell_negative_x += 1
            elif x > 0.01:
                shell_positive_x += 1
            else:
                shell_center_x += 1

    minimum, maximum = scene_bounds(meshes)
    dimensions = maximum - minimum
    shell_larger_side = max(shell_negative_x, shell_positive_x)
    shell_balance = (
        min(shell_negative_x, shell_positive_x) / shell_larger_side
        if shell_larger_side
        else 0.0
    )
    return {
        "meshes": len(meshes),
        "vertices": vertices,
        "triangles": triangles,
        "bounds_min": [round(float(value), 5) for value in minimum],
        "bounds_max": [round(float(value), 5) for value in maximum],
        "dimensions": [round(float(value), 5) for value in dimensions],
        "shell_negative_x": shell_negative_x,
        "shell_positive_x": shell_positive_x,
        "shell_center_x": shell_center_x,
        "shell_balance": round(shell_balance, 5),
    }


def removal_reason(obj):
    names = [name.lower() for name in material_names(obj)]
    searchable = " ".join([obj.name.lower(), *names])

    if obj.type in {"CAMERA", "LIGHT"}:
        return "scene-helper"
    if "sky" in names:
        return "sky"
    if "velg_vnd" in names or "sp522" in searchable:
        return "replaceable-rim"
    if obj.type == "MESH" and obj.name == "Cube" and len(obj.data.vertices) == 8:
        dims = sorted(round(float(value), 3) for value in obj.dimensions)
        if dims == [2.0, 2.0, 2.0] and names == ["material"]:
            return "export-artifact-cube"
    return None


def inspect_scene():
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    unwanted = []
    for obj in bpy.context.scene.objects:
        reason = removal_reason(obj)
        if reason:
            unwanted.append({
                "name": obj.name,
                "type": obj.type,
                "materials": material_names(obj),
                "reason": reason,
            })
    images = [
        {
            "name": image.name,
            "size": [int(image.size[0]), int(image.size[1])],
            "source": image.source,
        }
        for image in bpy.data.images
        if image.name not in {"Render Result", "Viewer Node"}
    ]
    return {
        **geometry_stats(meshes),
        "objects": len(bpy.context.scene.objects),
        "materials": len({
            slot.material.name
            for obj in meshes
            for slot in obj.material_slots
            if slot.material
        }),
        "images": images,
        "unwanted": unwanted,
    }


input_path, output_path, report_path = sys.argv[sys.argv.index("--") + 1:]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=input_path)
before = inspect_scene()

removed = []
for obj in list(bpy.context.scene.objects):
    reason = removal_reason(obj)
    if not reason:
        continue
    removed.append({
        "name": obj.name,
        "type": obj.type,
        "materials": material_names(obj),
        "reason": reason,
    })
    bpy.data.objects.remove(obj, do_unlink=True)

os.makedirs(os.path.dirname(output_path), exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format="GLB",
    export_apply=True,
    export_cameras=False,
    export_lights=False,
    export_animations=False,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=6,
)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=output_path)
after = inspect_scene()

errors = []
if after["unwanted"]:
    errors.append("unwanted objects remain after export")
if after["shell_negative_x"] == 0 or after["shell_positive_x"] == 0:
    errors.append("body shell geometry is missing on one side")
if after["shell_balance"] < 0.8:
    errors.append("body shell left/right balance is below 0.8")
if after["meshes"] < 80:
    errors.append("unexpectedly low mesh count")
if not after["images"] or any(min(image["size"]) <= 0 for image in after["images"]):
    errors.append("embedded texture image is missing or invalid")

result = {
    "source": input_path,
    "output": output_path,
    "source_bytes": os.path.getsize(input_path),
    "output_bytes": os.path.getsize(output_path),
    "compression_ratio": round(os.path.getsize(output_path) / os.path.getsize(input_path), 5),
    "before": before,
    "removed": removed,
    "after_reimport": after,
    "errors": errors,
    "passed": not errors,
}
with open(report_path, "w", encoding="utf-8") as handle:
    json.dump(result, handle, ensure_ascii=False, indent=2)

print(json.dumps({
    "output": output_path,
    "output_bytes": result["output_bytes"],
    "removed": removed,
    "after": after,
    "errors": errors,
    "passed": result["passed"],
}, ensure_ascii=False))
if errors:
    raise SystemExit(2)
