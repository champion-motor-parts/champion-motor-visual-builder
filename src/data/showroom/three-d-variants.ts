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
  glb?: string;
  modular?: {
    base: string;
    coverSet?: string;
    frontRim: string;
    rearRim: string;
  };
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
    modular: {
      base: "/models/y15zr/modular/y15zr-core.glb",
      coverSet: "/models/y15zr/modular/coversets/coverset-mx-blue.glb",
      frontRim: "/models/y15zr/modular/y15zr-rim-stock-front.glb",
      rearRim: "/models/y15zr/modular/y15zr-rim-stock-rear.glb",
    },
  },
  {
    modelId: "y15zr",
    coverSetId: "sniper_mx_2015_white_red",
    rimModelId: "lcv8_5spoke",
    rimColorId: "gold",
    modular: {
      base: "/models/y15zr/modular/y15zr-core.glb",
      coverSet:
        "/models/y15zr/modular/coversets/coverset-sniper-mx-2015-white-red.glb",
      frontRim: "/models/y15zr/modular/y15zr-rim-stock-front.glb",
      rearRim: "/models/y15zr/modular/y15zr-rim-stock-rear.glb",
    },
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
