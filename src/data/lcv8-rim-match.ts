export type BodyShellId = "cyan_orange" | "white_red" | "dark_orange";

export type RimColorId = "magenta" | "blue" | "red" | "orange_gold";

export type BodyShell = {
  id: BodyShellId;
  name: string;
  shortName: string;
  image: string;
  accent: string;
};

export type RimColor = {
  id: RimColorId;
  name: string;
  shortName: string;
  image: string;
  accent: string;
};

export type RimMatchSelection = {
  model: string;
  bodyShellId: BodyShellId;
  rimColorId: RimColorId;
  frontTyre: string;
  rearTyre: string;
  estimatedPrice: string;
};

const assetRoot = "/visual-builder/lcv8";

export const y15zrModelName = "Yamaha Y15ZR V1-V2";

export const frontTyreSize = "70/90-17";
export const rearTyreSize = "80/90-17";

export const bodyShells: BodyShell[] = [
  {
    id: "cyan_orange",
    name: "Cyan Orange Stock Body",
    shortName: "Cyan Orange",
    image: `${assetRoot}/bodies/body-cyan-orange.png`,
    accent: "#22d3ee",
  },
  {
    id: "white_red",
    name: "White Red Stock Body",
    shortName: "White Red",
    image: `${assetRoot}/bodies/body-white-red.png`,
    accent: "#ef4444",
  },
  {
    id: "dark_orange",
    name: "Dark Orange Stock Body",
    shortName: "Dark Orange",
    image: `${assetRoot}/bodies/body-dark-orange.png`,
    accent: "#f97316",
  },
];

export const rimColors: RimColor[] = [
  {
    id: "magenta",
    name: "LCV8 Magenta 5-Spoke",
    shortName: "Magenta",
    image: `${assetRoot}/rims/rim-magenta.png`,
    accent: "#d946ef",
  },
  {
    id: "blue",
    name: "LCV8 Blue 5-Spoke",
    shortName: "Blue",
    image: `${assetRoot}/rims/rim-blue.png`,
    accent: "#2563eb",
  },
  {
    id: "red",
    name: "LCV8 Red 5-Spoke",
    shortName: "Red",
    image: `${assetRoot}/rims/rim-red.png`,
    accent: "#dc2626",
  },
  {
    id: "orange_gold",
    name: "LCV8 Orange Gold 5-Spoke",
    shortName: "Orange Gold",
    image: `${assetRoot}/rims/rim-orange-gold.png`,
    accent: "#f59e0b",
  },
];

export function getPreviewImage(bodyShellId: BodyShellId, rimColorId: RimColorId) {
  return `${assetRoot}/previews/${bodyShellId}__${rimColorId}.png`;
}

export const rimMatchCombinations = bodyShells.flatMap((bodyShell) =>
  rimColors.map((rimColor) => ({
    id: `${bodyShell.id}__${rimColor.id}`,
    bodyShellId: bodyShell.id,
    rimColorId: rimColor.id,
    previewImage: getPreviewImage(bodyShell.id, rimColor.id),
  })),
);
