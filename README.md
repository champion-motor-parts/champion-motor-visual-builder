# Champion Motor Visual Builder

A mobile-first Next.js MVP for composing Yamaha motorcycle setup previews from transparent PNG layers.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Asset pack

Place the supplied transparent PNG layer files under:

```text
public/visual-builder/
```

The app expects the paths listed in `src/data/products.ts`. While those PNGs are missing, the canvas renders a built-in fallback preview so the sales flow can still be tested.
