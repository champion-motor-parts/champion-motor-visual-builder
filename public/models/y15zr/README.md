# Y15ZR 3D Pilot Asset

Place the reviewed web export at:

`public/models/y15zr/y15zr-pilot.glb`

The source Blender file is not served by the website. Export it as a single GLB with embedded
textures, then confirm that the cover set, rim design, and rim colour match an existing 2D
combination exactly.

After the GLB is verified, add that exact combination to:

`src/data/three-d-variants.ts`

Do not enable a combination until its GLB visually matches the selected product options.
