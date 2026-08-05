import type {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
} from "@/data/showroom/types";

export type ThreeDVariant = {
  modelId: MotorModelId;
  coverSetId: CoverSetId;
  rimModelId: RimModelId;
  rimColorId: RimColorId;
  glb: string;
  cameraOrbit?: string;
  mobileCameraOrbit?: string;
};

export const threeDVariants: readonly ThreeDVariant[] = [
  {
    modelId: "y15zr",
    coverSetId: "grey_gold",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    glb: "/models/y15zr/y15zr-pilot.glb",
  },
  {
    modelId: "y15zr",
    coverSetId: "mx_blue",
    rimModelId: "lcv8_5spoke",
    rimColorId: "gold",
    glb: "/models/y15zr/y15zr-mx-blue.glb",
    cameraOrbit: "45deg 72deg 82%",
    mobileCameraOrbit: "45deg 72deg 70%",
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
