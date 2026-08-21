# Y15ZR 3D Pilot Asset

The reviewed web exports are served from:

`public/models/y15zr/y15zr-pilot.glb`

`public/models/y15zr/y15zr-mx-blue.glb`

The source Blender file and its 140.55 MB safe export are not served by the website. The web
asset was generated from that export with glTF-Transform using Draco geometry compression,
locked mesh borders, a 0.2 simplification ratio, and the original embedded texture. The final
GLB is approximately 4.27 MB.

The registered combinations are:

`Y15ZR / Grey Gold / LCV8 5-Spoke / Orange Gold`

`Y15ZR / MX Blue / LCV8 5-Spoke / Gold`

The MX Blue source scene was exported with only visible product objects, excluding the Blender
lighting and camera helper collections. The optimized web model is approximately 2.75 MB.

Availability is controlled in:

`src/data/showroom/three-d-variants.ts`

Do not enable another combination until its GLB visually matches the selected product options.
