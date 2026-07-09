# Champion Motor GitHub Upload Guide

Use the prepared upload ZIP from `outputs/`.

Upload these folders/files only:

- `src`
- `public`
- `package.json`
- `package-lock.json`
- `next.config.js`
- `tailwind.config.ts`
- `postcss.config.js`
- `tsconfig.json`
- `README.md`
- `GITHUB_UPLOAD_GUIDE.md`

Do not upload these:

- `node_modules`
- `.next`
- `.vercel`
- any `.zip` file
- large source images that are not used by the app

If GitHub says a file is too large, upload in two commits:

1. Upload `src` and config files first.
2. Upload `public/visual-builder/showroom` after that.

Current showroom asset path:

`public/visual-builder/showroom/y16zr/lcv8-5spoke/`

Current selector structure:

- 1 motor model: Yamaha Y16ZR
- 5 cover sets
- 5 sport rim designs
- 4 rim colors

Only LCV8 5-Spoke currently has finished preview PNG files. Other rim designs are selectable
but will show a "Preview Image Needed" state until their finished PNG files are added.
