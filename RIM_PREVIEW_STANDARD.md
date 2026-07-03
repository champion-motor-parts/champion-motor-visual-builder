# Rim Preview Standard

Use this approach for future showroom rim previews.

## Preferred Method

When the base motorcycle photo already has a similar rim style:

1. Keep the original motorcycle photo, perspective, tire shape, fork, swingarm, and brake disc.
2. Detect only the existing rim color area.
3. Recolor the existing rim while preserving shadow, highlight, and metal texture.
4. Protect brake disc, hub holes, bolts, tire, fork, and swingarm from recoloring.
5. Export one final preview image per rim color.

This is more natural than pasting a transparent rim PNG on top.

## Use Transparent Rim Layers Only When

Use the transparent rim-layer workflow only when the rim design is clearly different from the original wheel.

For that workflow, each model angle needs fixed calibration:

- front wheel center
- rear wheel center
- front wheel size and rotation
- rear wheel size and rotation
- occluder mask for fork, brake disc, swingarm, and tire edge

## Asset Naming

Use stable lowercase ids:

```txt
public/visual-builder/lcv8/previews/{cover_set_id}__{rim_color_id}.png
```

Example:

```txt
public/visual-builder/lcv8/previews/grey_gold__blue.png
```

## Quality Notes

- Do not use screenshot-style images with visible filenames.
- Keep the motorcycle angle unchanged.
- Keep the brake disc silver unless the real product changes it.
- Avoid neon-looking colors. Keep the final result metallic and showroom-natural.
