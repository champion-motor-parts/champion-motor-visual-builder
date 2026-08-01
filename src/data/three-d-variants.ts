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

// Enable only combinations represented exactly by the exported GLB. The supplied
// .blend file still needs to be reviewed and exported before an entry is added.
export const threeDVariants: readonly ThreeDVariant[] = [];

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
