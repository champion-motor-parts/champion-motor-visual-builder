# Champion Motor Three.js Build Fix

This ZIP contains the minimal fix for the current Next.js build errors.

## What it fixes

1. Adds the missing `src/components/MotorcycleModelViewer.tsx`.
2. Adds `three` and `@types/three` to `package.json`.
3. Updates Three.js addon imports in `src/components/ModularMotorcycleViewer.tsx`.

## Apply

From your repository root:

1. Copy `package.json` into the repository root.
2. Copy `src/components/MotorcycleModelViewer.tsx` into `src/components/`.
3. Copy `apply_modular_import_fix.py` into the repository root and run:

   python apply_modular_import_fix.py

4. Run:

   npm install
   npm run typecheck
   npm run build

5. Commit the generated `package-lock.json` together with the other changes.

Important: GitHub integration returned 403 for write access, so this package does not push to your repository automatically.
