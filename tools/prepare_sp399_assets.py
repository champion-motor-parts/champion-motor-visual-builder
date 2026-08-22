"""Align the SP 399 source mesh to the existing Y15ZR front/rear wheel slots."""

from __future__ import annotations

import argparse
from pathlib import Path

import numpy as np
import trimesh
from trimesh.transformations import rotation_matrix


def load_scene(path: Path) -> trimesh.Scene:
    loaded = trimesh.load(path, force="scene")
    if not isinstance(loaded, trimesh.Scene):
        raise TypeError(f"Expected a scene in {path}")
    return loaded


def align_to_reference(source: trimesh.Trimesh, reference: trimesh.Scene) -> trimesh.Trimesh:
    aligned = source.copy()

    # Blender exports the source wheel in the XY plane. The motorcycle wheel
    # slots use the YZ plane, with X as the axle-width axis.
    aligned.apply_transform(rotation_matrix(np.pi / 2, [0, 1, 0]))

    reference_diameter = max(reference.extents[1], reference.extents[2])
    source_diameter = max(aligned.extents[1], aligned.extents[2])
    aligned.apply_scale(reference_diameter / source_diameter)

    reference_center = reference.bounds.mean(axis=0)
    aligned.apply_translation(reference_center - aligned.bounds.mean(axis=0))
    aligned.remove_unreferenced_vertices()
    aligned.merge_vertices()
    aligned.fix_normals()
    return aligned


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--front-reference", type=Path, required=True)
    parser.add_argument("--rear-reference", type=Path, required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    args = parser.parse_args()

    source_scene = load_scene(args.source)
    source_mesh = source_scene.to_mesh()
    if len(source_mesh.vertices) == 0:
        raise RuntimeError("SP 399 source mesh is empty")

    args.output_dir.mkdir(parents=True, exist_ok=True)
    for position, reference_path in (
        ("front", args.front_reference),
        ("rear", args.rear_reference),
    ):
        reference = load_scene(reference_path)
        aligned = align_to_reference(source_mesh, reference)
        aligned.metadata.update(
            {
                "name": f"SP399_{position.upper()}",
                "rim_size": "1.60 x 17",
                "width_inches": 1.60,
                "diameter_inches": 17,
            }
        )
        output_path = args.output_dir / f"sp399-{position}.glb"
        aligned.export(output_path, file_type="glb")
        print(
            f"{output_path}: {len(aligned.vertices):,} vertices, "
            f"extents={aligned.extents.tolist()}"
        )


if __name__ == "__main__":
    main()
