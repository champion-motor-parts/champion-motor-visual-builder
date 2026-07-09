# Y16ZR Showroom Asset Map

The app already supports:

- 5 cover sets
- 5 sport rim designs
- 4 rim colors

Finished preview images are stored under:

`public/visual-builder/showroom/y16zr/<rim-design-folder>/`

Current ready folder:

`public/visual-builder/showroom/y16zr/lcv8-5spoke/`

## Cover Set IDs

- `cyan_black`
- `red_black_white`
- `white_red`
- `green_black`
- `blue_silver`

## Rim Design IDs

- `lcv8_5spoke` -> folder `lcv8-5spoke`
- `six_spoke_sport` -> folder `six-spoke-sport`
- `y_spoke_racing` -> folder `y-spoke-racing`
- `ten_spoke_track` -> folder `ten-spoke-track`
- `split_spoke_forged` -> folder `split-spoke-forged`

## Rim Color IDs

- `magenta`
- `blue`
- `red`
- `orange_gold`

## File Naming Rule

Use this exact pattern:

`<coverSetId>__<rimColorId>.png`

Example:

`public/visual-builder/showroom/y16zr/six-spoke-sport/red_black_white__blue.png`

When a finished PNG is added, add a matching entry in:

`src/data/showroom-preview-assets.ts`

