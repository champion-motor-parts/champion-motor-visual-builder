export type MotorModelId = "y16zr" | "y15zr";
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
  | "blue_silver"
  | "grey_gold"
  | "cyan_orange"
  | "dark_orange";
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
const y15Lcv8Root = "/visual-builder/lcv8/previews";

export const motorModels = [
  {
    id: "y16zr",
    label: "Yamaha Y16ZR",
    shortLabel: "Y16ZR",
  },
  {
    id: "y15zr",
    label: "Yamaha Y15ZR V1-V2",
    shortLabel: "Y15ZR",
  },
] as const;

export const rimModels = [
  {
    id: "lcv8_5spoke",
    label: "LCV8 5-Spoke",
    shortLabel: "LCV8",
    motorModelIds: ["y16zr", "y15zr"],
  },
  {
    id: "six_spoke_sport",
    label: "6-Spoke Sport",
    shortLabel: "6-Spoke",
    motorModelIds: ["y16zr"],
  },
  {
    id: "y_spoke_racing",
    label: "Y-Spoke Racing",
    shortLabel: "Y-Spoke",
    motorModelIds: ["y16zr"],
  },
  {
    id: "ten_spoke_track",
    label: "10-Spoke Track",
    shortLabel: "10-Spoke",
    motorModelIds: ["y16zr"],
  },
  {
    id: "split_spoke_forged",
    label: "Split-Spoke Forged",
    shortLabel: "Split",
    motorModelIds: ["y16zr"],
  },
] as const;

export const coverSets = [
  {
    id: "cyan_black",
    label: "Cyan Black",
    shortLabel: "Cyan",
    accent: "#16c8e8",
    motorModelIds: ["y16zr"],
  },
  {
    id: "red_black_white",
    label: "Red Black White",
    shortLabel: "Red",
    accent: "#e11d2e",
    motorModelIds: ["y16zr"],
  },
  {
    id: "white_red",
    label: "White Red",
    shortLabel: "White",
    accent: "#f8f8f2",
    motorModelIds: ["y16zr", "y15zr"],
  },
  {
    id: "green_black",
    label: "Green Black",
    shortLabel: "Green",
    accent: "#6f8f5f",
    motorModelIds: ["y16zr"],
  },
  {
    id: "blue_silver",
    label: "Blue Silver",
    shortLabel: "Blue",
    accent: "#7897ad",
    motorModelIds: ["y16zr"],
  },
  {
    id: "grey_gold",
    label: "Grey Gold",
    shortLabel: "Grey",
    accent: "#9a8a6a",
    motorModelIds: ["y15zr"],
  },
  {
    id: "cyan_orange",
    label: "Cyan Orange",
    shortLabel: "Cyan",
    accent: "#22d3ee",
    motorModelIds: ["y15zr"],
  },
  {
    id: "dark_orange",
    label: "Dark Orange",
    shortLabel: "Dark",
    accent: "#f97316",
    motorModelIds: ["y15zr"],
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

const y16Lcv8Pairs = [
  ["cyan_black", "magenta"],
  ["cyan_black", "red"],
  ["cyan_black", "orange_gold"],
  ["red_black_white", "red"],
  ["red_black_white", "blue"],
  ["red_black_white", "magenta"],
  ["red_black_white", "orange_gold"],
  ["white_red", "orange_gold"],
  ["white_red", "blue"],
  ["white_red", "red"],
  ["white_red", "magenta"],
  ["green_black", "red"],
  ["green_black", "orange_gold"],
  ["green_black", "blue"],
  ["green_black", "magenta"],
] as const satisfies readonly (readonly [CoverSetId, RimColorId])[];

const y15CoverSetIds = ["grey_gold", "cyan_orange", "white_red", "dark_orange"] as const;
const allRimColorIds = rimColors.map((rimColor) => rimColor.id);

const y16PreviewAssets: ShowroomPreviewAsset[] = y16Lcv8Pairs.map(
  ([coverSetId, rimColorId]) => ({
    id: `y16zr__${coverSetId}__lcv8_5spoke__${rimColorId}`,
    motorModelId: "y16zr",
    coverSetId,
    rimModelId: "lcv8_5spoke",
    rimColorId,
    previewImage: `${y16Lcv8Root}/${coverSetId}__${rimColorId}.png`,
  }),
);

const y15PreviewAssets: ShowroomPreviewAsset[] = y15CoverSetIds.flatMap((coverSetId) =>
  allRimColorIds.map((rimColorId) => ({
    id: `y15zr__${coverSetId}__lcv8_5spoke__${rimColorId}`,
    motorModelId: "y15zr",
    coverSetId,
    rimModelId: "lcv8_5spoke",
    rimColorId,
    previewImage: `${y15Lcv8Root}/${coverSetId}__${rimColorId}.png`,
  })),
);

export const showroomPreviewAssets: readonly ShowroomPreviewAsset[] = [
  ...y16PreviewAssets,
  ...y15PreviewAssets,
];

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

export function getCoverSetsForMotorModel(motorModelId: MotorModelId) {
  return coverSets.filter((coverSet) =>
    coverSet.motorModelIds.some((supportedModelId) => supportedModelId === motorModelId),
  );
}

export function getRimModelsForMotorModel(motorModelId: MotorModelId) {
  return rimModels.filter((rimModel) =>
    rimModel.motorModelIds.some((supportedModelId) => supportedModelId === motorModelId),
  );
}

export function getPreviewAssetsForSetup(motorModelId: MotorModelId, rimModelId: RimModelId) {
  return showroomPreviewAssets.filter(
    (asset) => asset.motorModelId === motorModelId && asset.rimModelId === rimModelId,
  );
}
