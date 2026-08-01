# Y15ZR 3D Pilot

## Current status

The existing 2D configurator remains the default. The 3D viewer is loaded only after the customer
selects a combination registered in `src/data/three-d-variants.ts` and taps the 3D view control.

The supplied Blender file is a source file, not a browser-ready asset. Blender is not installed in
the current development environment, so no unverified or fake GLB has been committed.

## Add the real model

1. Open `Yamaha Mx King Y15R test.blend` in Blender.
2. Confirm the exact cover set, rim design, and rim colour represented by the model.
3. Export a single GLB with embedded textures.
4. Optimise the GLB for mobile before publishing.
5. Save it as `public/models/y15zr/y15zr-pilot.glb`.
6. Add the exact matching combination to `src/data/three-d-variants.ts`.

Example using only IDs that already exist in the configurator:

```ts
{
  modelId: "y15zr",
  coverSetId: "grey_gold",
  rimModelId: "lcv8_5spoke",
  rimColorId: "blue",
  glb: "/models/y15zr/y15zr-pilot.glb",
}
```

Only use the example if the exported model visually matches that exact combination. Unsupported
or unverified combinations remain in 2D mode.

## Viewer behaviour

- 2D remains the initial and fallback view.
- The selected model, cover set, rim type, and rim colour are shared between 2D and 3D.
- Missing 3D variants keep the matching 2D image visible.
- A failed GLB request restores the 2D image and displays a status message.
- Rotation, pinch zoom, camera reset, fullscreen, and loading progress are included.
