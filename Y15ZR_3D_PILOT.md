# Y15ZR 3D Pilot

## Current status

The existing 2D configurator remains the default. The 3D viewer is loaded only after the customer
selects a combination registered in `src/data/three-d-variants.ts` and taps the 3D view control.

The reviewed pilot GLB is now available for one exact Y15ZR configuration. Every unsupported
configuration continues to use its existing 2D preview.

## Pilot asset

The 140.55 MB safe Blender export was optimized for mobile without modifying the source file.
The web asset uses Draco geometry compression, locked mesh borders, a 0.2 simplification ratio,
and the original embedded texture. The final GLB is approximately 4.27 MB and is stored at:

`public/models/y15zr/y15zr-pilot.glb`

The registered combination is:

```ts
{
  modelId: "y15zr",
  coverSetId: "grey_gold",
  rimModelId: "lcv8_5spoke",
  rimColorId: "orange_gold",
  glb: "/models/y15zr/y15zr-pilot.glb",
}
```

Unsupported or unverified combinations remain in 2D mode. Add future entries only after their
cover set, rim design, and rim colour have been visually confirmed.

## Viewer behaviour

- 2D remains the initial and fallback view.
- The selected model, cover set, rim type, and rim colour are shared between 2D and 3D.
- Missing 3D variants keep the matching 2D image visible.
- A failed GLB request restores the 2D image and displays a status message.
- Rotation, pinch zoom, camera reset, fullscreen, and loading progress are included.
