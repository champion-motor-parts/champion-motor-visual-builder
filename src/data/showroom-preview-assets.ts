export type MotorModelId = "y16zr";
export type RimModelId =
  | "lcv8_5spoke"
  | "six_spoke_sport"
  | "y_spoke_racing"
  | "ten_spoke_track"
  | "split_spoke_forged";
export type CoverSetId =
  | "cyan_black"
  | "red_black_white"
  | "white_red"
  | "green_black"
  | "blue_silver";
export type RimColorId = "magenta" | "blue" | "red" | "orange_gold";

export type ShowroomPreviewAsset = {
  id: string;
  motorModelId: MotorModelId;
  coverSetId: CoverSetId;
  rimModelId: RimModelId;
  rimColorId: RimColorId;
  previewImage: string;
};

const y16Lcv8Root = "/visual-builder/showroom/y16zr/lcv8-5spoke";

export const motorModels = [
  {
    id: "y16zr",
    label: "Yamaha Y16ZR",
    shortLabel: "Y16ZR",
  },
] as const;

export const rimModels = [
  {
    id: "lcv8_5spoke",
    label: "LCV8 5-Spoke",
    shortLabel: "LCV8",
  },
  {
    id: "six_spoke_sport",
    label: "6-Spoke Sport",
    shortLabel: "6-Spoke",
  },
  {
    id: "y_spoke_racing",
    label: "Y-Spoke Racing",
    shortLabel: "Y-Spoke",
  },
  {
    id: "ten_spoke_track",
    label: "10-Spoke Track",
    shortLabel: "10-Spoke",
  },
  {
    id: "split_spoke_forged",
    label: "Split-Spoke Forged",
    shortLabel: "Split",
  },
] as const;

export const coverSets = [
  {
    id: "cyan_black",
    label: "Cyan Black",
    shortLabel: "Cyan",
    accent: "#16c8e8",
  },
  {
    id: "red_black_white",
    label: "Red Black White",
    shortLabel: "Red",
    accent: "#e11d2e",
  },
  {
    id: "white_red",
    label: "White Red",
    shortLabel: "White",
    accent: "#f8f8f2",
  },
  {
    id: "green_black",
    label: "Green Black",
    shortLabel: "Green",
    accent: "#6f8f5f",
  },
  {
    id: "blue_silver",
    label: "Blue Silver",
    shortLabel: "Blue",
    accent: "#7897ad",
  },
] as const;

export const rimColors = [
  {
    id: "magenta",
    label: "Magenta",
    hex: "#d21ac5",
  },
  {
    id: "blue",
    label: "Blue",
    hex: "#0055d8",
  },
  {
    id: "red",
    label: "Red",
    hex: "#d71919",
  },
  {
    id: "orange_gold",
    label: "Orange Gold",
    hex: "#f28a00",
  },
] as const;

export const showroomPreviewAssets = [
  {
    id: "y16zr__cyan_black__lcv8_5spoke__magenta",
    motorModelId: "y16zr",
    coverSetId: "cyan_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "magenta",
    previewImage: `${y16Lcv8Root}/cyan_black__magenta.png`,
  },
  {
    id: "y16zr__cyan_black__lcv8_5spoke__red",
    motorModelId: "y16zr",
    coverSetId: "cyan_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "red",
    previewImage: `${y16Lcv8Root}/cyan_black__red.png`,
  },
  {
    id: "y16zr__cyan_black__lcv8_5spoke__orange_gold",
    motorModelId: "y16zr",
    coverSetId: "cyan_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    previewImage: `${y16Lcv8Root}/cyan_black__orange_gold.png`,
  },
  {
    id: "y16zr__red_black_white__lcv8_5spoke__red",
    motorModelId: "y16zr",
    coverSetId: "red_black_white",
    rimModelId: "lcv8_5spoke",
    rimColorId: "red",
    previewImage: `${y16Lcv8Root}/red_black_white__red.png`,
  },
  {
    id: "y16zr__red_black_white__lcv8_5spoke__blue",
    motorModelId: "y16zr",
    coverSetId: "red_black_white",
    rimModelId: "lcv8_5spoke",
    rimColorId: "blue",
    previewImage: `${y16Lcv8Root}/red_black_white__blue.png`,
  },
  {
    id: "y16zr__red_black_white__lcv8_5spoke__magenta",
    motorModelId: "y16zr",
    coverSetId: "red_black_white",
    rimModelId: "lcv8_5spoke",
    rimColorId: "magenta",
    previewImage: `${y16Lcv8Root}/red_black_white__magenta.png`,
  },
  {
    id: "y16zr__red_black_white__lcv8_5spoke__orange_gold",
    motorModelId: "y16zr",
    coverSetId: "red_black_white",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    previewImage: `${y16Lcv8Root}/red_black_white__orange_gold.png`,
  },
  {
    id: "y16zr__white_red__lcv8_5spoke__orange_gold",
    motorModelId: "y16zr",
    coverSetId: "white_red",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    previewImage: `${y16Lcv8Root}/white_red__orange_gold.png`,
  },
  {
    id: "y16zr__white_red__lcv8_5spoke__blue",
    motorModelId: "y16zr",
    coverSetId: "white_red",
    rimModelId: "lcv8_5spoke",
    rimColorId: "blue",
    previewImage: `${y16Lcv8Root}/white_red__blue.png`,
  },
  {
    id: "y16zr__white_red__lcv8_5spoke__red",
    motorModelId: "y16zr",
    coverSetId: "white_red",
    rimModelId: "lcv8_5spoke",
    rimColorId: "red",
    previewImage: `${y16Lcv8Root}/white_red__red.png`,
  },
  {
    id: "y16zr__white_red__lcv8_5spoke__magenta",
    motorModelId: "y16zr",
    coverSetId: "white_red",
    rimModelId: "lcv8_5spoke",
    rimColorId: "magenta",
    previewImage: `${y16Lcv8Root}/white_red__magenta.png`,
  },
  {
    id: "y16zr__green_black__lcv8_5spoke__red",
    motorModelId: "y16zr",
    coverSetId: "green_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "red",
    previewImage: `${y16Lcv8Root}/green_black__red.png`,
  },
  {
    id: "y16zr__green_black__lcv8_5spoke__orange_gold",
    motorModelId: "y16zr",
    coverSetId: "green_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    previewImage: `${y16Lcv8Root}/green_black__orange_gold.png`,
  },
  {
    id: "y16zr__green_black__lcv8_5spoke__blue",
    motorModelId: "y16zr",
    coverSetId: "green_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "blue",
    previewImage: `${y16Lcv8Root}/green_black__blue.png`,
  },
  {
    id: "y16zr__green_black__lcv8_5spoke__magenta",
    motorModelId: "y16zr",
    coverSetId: "green_black",
    rimModelId: "lcv8_5spoke",
    rimColorId: "magenta",
    previewImage: `${y16Lcv8Root}/green_black__magenta.png`,
  },
] as const satisfies readonly ShowroomPreviewAsset[];

export function getPreviewAsset(
  motorModelId: MotorModelId,
  coverSetId: CoverSetId,
  rimModelId: RimModelId,
  rimColorId: RimColorId,
) {
  return showroomPreviewAssets.find(
    (asset) =>
      asset.motorModelId === motorModelId &&
      asset.coverSetId === coverSetId &&
      asset.rimModelId === rimModelId &&
      asset.rimColorId === rimColorId,
  );
}

export function getAvailableCoverSets(motorModelId: MotorModelId, rimModelId: RimModelId) {
  return coverSets.filter((coverSet) =>
    showroomPreviewAssets.some(
      (asset) =>
        asset.motorModelId === motorModelId &&
        asset.rimModelId === rimModelId &&
        asset.coverSetId === coverSet.id,
    ),
  );
}

export function getAvailableRimColors(
  motorModelId: MotorModelId,
  coverSetId: CoverSetId,
  rimModelId: RimModelId,
) {
  return rimColors.filter((rimColor) =>
    showroomPreviewAssets.some(
      (asset) =>
        asset.motorModelId === motorModelId &&
        asset.coverSetId === coverSetId &&
        asset.rimModelId === rimModelId &&
      asset.rimColorId === rimColor.id,
    ),
  );
}

export function getPreviewAssetsForSetup(motorModelId: MotorModelId, rimModelId: RimModelId) {
  return showroomPreviewAssets.filter(
    (asset) => asset.motorModelId === motorModelId && asset.rimModelId === rimModelId,
  );
}
