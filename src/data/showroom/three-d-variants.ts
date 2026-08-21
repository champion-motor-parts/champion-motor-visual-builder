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

const modularCoverSets: readonly {
  coverSetId: CoverSetId;
  path?: string;
  base?: string;
}[] = [
  {
    coverSetId: "mx_blue",
    path: "/models/y15zr/modular/coversets/coverset-mx-blue.glb",
  },
  {
    coverSetId: "sniper_mx_2015_white_red",
    path: "/models/y15zr/modular/coversets/coverset-sniper-mx-2015-white-red.glb",
  },
  {
    coverSetId: "exciter_rc_black_green",
    base: "/models/y15zr/variants/exciter-rc-black-green-no-rims.glb",
  },
  {
    coverSetId: "exciter_rc_black_purple",
    base: "/models/y15zr/variants/exciter-rc-black-purple-no-rims.glb",
  },
  {
    coverSetId: "exciter_rc_white_red",
    base: "/models/y15zr/variants/exciter-rc-white-red-no-rims.glb",
  },
  {
    coverSetId: "exciter_rc_black_red",
    base: "/models/y15zr/variants/exciter-rc-black-red-no-rims.glb",
  },
] as const;

const lcv8ColorIds = ["matt_black", "gloss_black", "white"] as const;

const sp522ColorIds = ["matt_black", "gloss_black", "gold"] as const;

export const threeDVariants: readonly ThreeDVariant[] = [
  {
    modelId: "y15zr",
    coverSetId: "grey_gold",
    rimModelId: "lcv8_5spoke",
    rimColorId: "orange_gold",
    glb: "/models/y15zr/y15zr-pilot.glb",
  },
  ...modularCoverSets.flatMap(({ coverSetId, path, base }) => [
    ...lcv8ColorIds.map(
      (rimColorId): ThreeDVariant => ({
        modelId: "y15zr",
        coverSetId,
        rimModelId: "lcv8_5spoke",
        rimColorId,
        modular: {
          base: base ?? "/models/y15zr/modular/y15zr-core.glb",
          coverSet: path,
          frontRim: "/models/y15zr/modular/y15zr-rim-stock-front.glb",
          rearRim: "/models/y15zr/modular/y15zr-rim-stock-rear.glb",
        },
      }),
    ),
    ...sp522ColorIds.map(
      (rimColorId): ThreeDVariant => ({
        modelId: "y15zr",
        coverSetId,
        rimModelId: "sp522",
        rimColorId,
        modular: {
          base: base ?? "/models/y15zr/modular/y15zr-core.glb",
          coverSet: path,
          frontRim: "/models/y15zr/modular/rims/sp522/sp522-front.glb",
          rearRim: "/models/y15zr/modular/rims/sp522/sp522-rear.glb",
        },
      }),
    ),
  ]),
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
