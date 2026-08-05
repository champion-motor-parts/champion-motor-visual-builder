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
};

export const motorModels: readonly MotorModel[] = [
  { id: "y16zr", label: "Yamaha Y16ZR", shortLabel: "Y16ZR" },
  { id: "y15zr", label: "Yamaha Y15ZR V1-V2", shortLabel: "Y15ZR" },
];

export const rimModels: readonly RimModel[] = [
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

export const coverSets: readonly CoverSet[] = [
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

export const rimColors: readonly RimColor[] = [
  { id: "magenta", label: "Magenta", hex: "#d21ac5" },
  { id: "blue", label: "Blue", hex: "#0055d8" },
  { id: "red", label: "Red", hex: "#d71919" },
  { id: "orange_gold", label: "Orange Gold", hex: "#f28a00" },
  { id: "gold", label: "Gold", hex: "#c9a94f" },
];

export function getCoverSetsForMotorModel(motorModelId: MotorModelId) {
  return coverSets.filter((coverSet) => coverSet.motorModelIds.includes(motorModelId));
}

export function getRimModelsForMotorModel(motorModelId: MotorModelId) {
  return rimModels.filter((rimModel) => rimModel.motorModelIds.includes(motorModelId));
}

