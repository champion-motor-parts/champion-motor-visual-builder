import type {
  CoverSetId,
  MotorModelId,
  RimColorId,
  RimModelId,
} from "@/data/showroom/types";

type MotorModel = {
  id: MotorModelId;
  label: string;
  shortLabel: string;
};

type RimModel = {
  id: RimModelId;
  label: string;
  shortLabel: string;
  motorModelIds: readonly MotorModelId[];
  rimColorIds?: readonly RimColorId[];
};

type CoverSet = {
  id: CoverSetId;
  label: string;
  shortLabel: string;
  accent: string;
  motorModelIds: readonly MotorModelId[];
};

type RimColor = {
  id: RimColorId;
  label: string;
  hex: string;
  materialHex?: string;
  finish?: "matte" | "gloss" | "metallic";
};

const allMotorModels: readonly MotorModel[] = [
  { id: "y16zr", label: "Yamaha Y16ZR", shortLabel: "Y16ZR" },
  { id: "y15zr", label: "Yamaha Y15ZR V1-V2", shortLabel: "Y15ZR" },
];

export const motorModels = allMotorModels.filter((model) => model.id === "y15zr");

const allRimModels: readonly RimModel[] = [
  {
    id: "sp522",
    label: "SP522",
    shortLabel: "SP522",
    motorModelIds: ["y15zr"],
    rimColorIds: ["matt_black", "gloss_black", "gold"],
  },
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
];

export const rimModels = allRimModels.filter(
  (rimModel) =>
    (rimModel.id === "sp522" || rimModel.id === "lcv8_5spoke") &&
    rimModel.motorModelIds.includes("y15zr"),
);

const allCoverSets: readonly CoverSet[] = [
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
    id: "mx_blue",
    label: "MX Blue",
    shortLabel: "MX Blue",
    accent: "#245eea",
    motorModelIds: ["y15zr"],
  },
  {
    id: "sniper_mx_2015_white_red",
    label: "Sniper MX 2015 White Red",
    shortLabel: "Sniper MX",
    accent: "#d71920",
    motorModelIds: ["y15zr"],
  },
  {
    id: "exciter_rc_black_green",
    label: "Exciter RC Black Green",
    shortLabel: "RC Black Green",
    accent: "#2f7a4c",
    motorModelIds: ["y15zr"],
  },
  {
    id: "exciter_rc_black_purple",
    label: "Exciter RC Black Purple",
    shortLabel: "RC Black Purple",
    accent: "#7b3fc5",
    motorModelIds: ["y15zr"],
  },
  {
    id: "exciter_rc_white_red",
    label: "Exciter RC White Red",
    shortLabel: "RC White Red",
    accent: "#e53935",
    motorModelIds: ["y15zr"],
  },
  {
    id: "exciter_rc_black_red",
    label: "Exciter RC Black Red",
    shortLabel: "RC Black Red",
    accent: "#c51f2d",
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
];

const visibleCoverSetIds: readonly CoverSetId[] = [
  "mx_blue",
  "sniper_mx_2015_white_red",
  "exciter_rc_black_green",
  "exciter_rc_black_purple",
  "exciter_rc_white_red",
  "exciter_rc_black_red",
];

export const coverSets = allCoverSets.filter((coverSet) =>
  visibleCoverSetIds.includes(coverSet.id),
);

export const rimColors: readonly RimColor[] = [
  {
    id: "matt_black",
    label: "Matt Black",
    hex: "#55585d",
    materialHex: "#121315",
    finish: "matte",
  },
  {
    id: "gloss_black",
    label: "Gloss Black",
    hex: "#25272b",
    materialHex: "#050506",
    finish: "gloss",
  },
  { id: "magenta", label: "Magenta", hex: "#d21ac5" },
  { id: "blue", label: "Blue", hex: "#0055d8" },
  { id: "red", label: "Red", hex: "#d71919" },
  { id: "orange_gold", label: "Orange Gold", hex: "#f28a00" },
  {
    id: "gold",
    label: "Gold",
    hex: "#c9a94f",
    materialHex: "#c88919",
    finish: "metallic",
  },
];

export function getCoverSetsForMotorModel(motorModelId: MotorModelId) {
  return coverSets.filter((coverSet) => coverSet.motorModelIds.includes(motorModelId));
}

export function getRimModelsForMotorModel(motorModelId: MotorModelId) {
  return rimModels.filter((rimModel) => rimModel.motorModelIds.includes(motorModelId));
}

