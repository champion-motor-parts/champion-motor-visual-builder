import type {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
} from "@/data/showroom-preview-assets";

export type ThreeDVariant = {
  modelId: MotorModelId;
  coverSetId: CoverSetId;
  rimModelId: RimModelId;
  rimColorId: RimColorId;
  glb: string;
};

export const Y15ZR_PILOT_GLB_PATH = "/models/y15zr/y15zr-pilot.glb";

// The pilot export represents the existing grey/gold Y15ZR setup with the
// orange-gold LCV8 wheel finish. Keep every other combination on its 2D image.
export const threeDVariants: readonly ThreeDVariant[] = [
  {
    modelId: "y15zr",
    coverSetId: "grey_gold",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    glb: Y15ZR_PILOT_GLB_PATH,
  },
];

export function getThreeDVariant(
  modelId: MotorModelId,
  coverSetId: CoverSetId,
  rimModelId: RimModelId,
  rimColorId: RimColorId,
) {
  return threeDVariants.find(
    (variant) =>
      variant.modelId === modelId &&
      variant.coverSetId === coverSetId &&
      variant.rimModelId === rimModelId &&
      variant.rimColorId === rimColorId,
  );
}
