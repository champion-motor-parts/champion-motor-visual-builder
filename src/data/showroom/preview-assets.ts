import { rimColors, rimModels } from "@/data/showroom/catalog";
import type {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
  ShowroomPreviewAsset,
} from "@/data/showroom/types";

const y16Lcv8Root = "/visual-builder/showroom/y16zr/lcv8-5spoke";
const y15Lcv8Root = "/visual-builder/lcv8/previews";

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

const legacyY15CoverSetIds = ["grey_gold", "cyan_orange", "white_red", "dark_orange"] as const;
const legacyRimColorIds = ["magenta", "blue", "red", "orange_gold"] as const;

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

const y15PreviewAssets: ShowroomPreviewAsset[] = legacyY15CoverSetIds.flatMap(
  (coverSetId) =>
    legacyRimColorIds.map((rimColorId) => ({
      id: `y15zr__${coverSetId}__lcv8_5spoke__${rimColorId}`,
      motorModelId: "y15zr" as const,
      coverSetId,
      rimModelId: "lcv8_5spoke" as const,
      rimColorId,
      previewImage: `${y15Lcv8Root}/${coverSetId}__${rimColorId}.png`,
    })),
);

const mxBluePreviewAsset: ShowroomPreviewAsset = {
  id: "y15zr__mx_blue__lcv8_5spoke__gold",
  motorModelId: "y15zr",
  coverSetId: "mx_blue",
  rimModelId: "lcv8_5spoke",
  rimColorId: "gold",
  previewImage: "/visual-builder/showroom/y15zr/mx-blue/mx_blue__gold.png",
};

const sniperMxPreviewAsset: ShowroomPreviewAsset = {
  id: "y15zr__sniper_mx_2015_white_red__lcv8_5spoke__gold",
  motorModelId: "y15zr",
  coverSetId: "sniper_mx_2015_white_red",
  rimModelId: "lcv8_5spoke",
  rimColorId: "gold",
  previewImage:
    "/visual-builder/showroom/y15zr/sniper-mx-2015/sniper_mx_2015_white_red__gold.png",
};

const allShowroomPreviewAssets: readonly ShowroomPreviewAsset[] = [
  ...y16PreviewAssets,
  ...y15PreviewAssets,
  mxBluePreviewAsset,
  sniperMxPreviewAsset,
];

export const showroomPreviewAssets = allShowroomPreviewAssets.filter(
  (asset) =>
    asset.motorModelId === "y15zr" &&
    (asset.coverSetId === "mx_blue" ||
      asset.coverSetId === "sniper_mx_2015_white_red"),
);

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

export function getPreviewAssetsForSetup(motorModelId: MotorModelId, rimModelId: RimModelId) {
  const rimModel = rimModels.find((item) => item.id === rimModelId);

  return showroomPreviewAssets.filter(
    (asset) =>
      asset.motorModelId === motorModelId &&
      asset.rimModelId === rimModelId &&
      (!rimModel?.rimColorIds || rimModel.rimColorIds.includes(asset.rimColorId)),
  );
}

export function getRimColorsForSetup(
  motorModelId: MotorModelId,
  coverSetId: CoverSetId,
  rimModelId: RimModelId,
) {
  const supportedColorIds = new Set(
    showroomPreviewAssets
      .filter(
        (asset) =>
          asset.motorModelId === motorModelId &&
          asset.coverSetId === coverSetId &&
          asset.rimModelId === rimModelId,
      )
      .map((asset) => asset.rimColorId),
  );

  const rimModel = rimModels.find((item) => item.id === rimModelId);
  if (rimModel?.rimColorIds) {
    return rimColors.filter((rimColor) => rimModel.rimColorIds?.includes(rimColor.id));
  }

  if (supportedColorIds.size === 0) return rimColors;
  return rimColors.filter((rimColor) => supportedColorIds.has(rimColor.id));
}

