export type BikeModel = {
  id: string;
  name: string;
  image: string;
};

export type Coverset = {
  id: string;
  name: string;
  image: string;
  suitableModels: string[];
  colorTheme: string;
  estimatedPrice: number;
};

export type Rim = {
  id: string;
  name: string;
  image: string;
  color: string;
  spoke: string;
  frontTyre: string;
  rearTyre: string;
  estimatedPrice: number;
};

export type AccessoryLayer = {
  id: string;
  name: string;
  image: string;
  estimatedPrice: number;
};

export type SetupPackage = {
  id: string;
  name: string;
  modelId: string;
  coversetId: string;
  rimId: string;
  accessoryLayerId: string;
  description: string;
};

const assetRoot = "/visual-builder/assets";

export const bikeModels: BikeModel[] = [
  {
    id: "y15zr",
    name: "Yamaha Y15ZR",
    image: `${assetRoot}/base/Y15ZR_BASE.png`,
  },
  {
    id: "y16zr",
    name: "Yamaha Y16ZR",
    image: `${assetRoot}/base/Y16ZR_BASE.png`,
  },
  {
    id: "lc135",
    name: "Yamaha LC135",
    image: `${assetRoot}/base/LC135_BASE.png`,
  },
];

export const coversets: Coverset[] = [
  {
    id: "black-burgundy",
    name: "Black Burgundy",
    image: `${assetRoot}/coversets/COVERSET_BLACK_BURGUNDY.png`,
    suitableModels: ["y15zr", "y16zr"],
    colorTheme: "Deep burgundy with gloss black",
    estimatedPrice: 620,
  },
  {
    id: "black-gold",
    name: "Black Gold",
    image: `${assetRoot}/coversets/COVERSET_BLACK_GOLD.png`,
    suitableModels: ["y15zr", "y16zr", "lc135"],
    colorTheme: "Gloss black with gold accents",
    estimatedPrice: 650,
  },
  {
    id: "yamaha-blue",
    name: "Yamaha Blue",
    image: `${assetRoot}/coversets/COVERSET_YAMAHA_BLUE.png`,
    suitableModels: ["y15zr", "y16zr"],
    colorTheme: "Factory blue and black",
    estimatedPrice: 590,
  },
  {
    id: "red-black",
    name: "Red Black",
    image: `${assetRoot}/coversets/COVERSET_RED_BLACK.png`,
    suitableModels: ["y15zr", "y16zr", "lc135"],
    colorTheme: "Racing red with satin black",
    estimatedPrice: 580,
  },
  {
    id: "white",
    name: "White",
    image: `${assetRoot}/coversets/COVERSET_WHITE.png`,
    suitableModels: ["y15zr", "y16zr", "lc135"],
    colorTheme: "Clean white with light trim",
    estimatedPrice: 560,
  },
];

export const rims: Rim[] = [
  {
    id: "magenta-4spoke",
    name: "Magenta 4-Spoke",
    image: `${assetRoot}/rims/full/RIM_MAGENTA_4SPOKE_FRONT_REAR_LAYER.png`,
    color: "Magenta",
    spoke: "4-spoke",
    frontTyre: "70/90-17",
    rearTyre: "80/90-17",
    estimatedPrice: 880,
  },
  {
    id: "gold-4spoke",
    name: "Gold 4-Spoke",
    image: `${assetRoot}/rims/full/RIM_GOLD_4SPOKE_FRONT_REAR_LAYER.png`,
    color: "Gold",
    spoke: "4-spoke",
    frontTyre: "70/90-17",
    rearTyre: "80/90-17",
    estimatedPrice: 920,
  },
  {
    id: "blackblue-4spoke",
    name: "Black Blue 4-Spoke",
    image: `${assetRoot}/rims/full/RIM_BLACKBLUE_4SPOKE_FRONT_REAR_LAYER.png`,
    color: "Black Blue",
    spoke: "4-spoke",
    frontTyre: "70/90-17",
    rearTyre: "80/90-17",
    estimatedPrice: 900,
  },
  {
    id: "blackred-4spoke",
    name: "Black Red 4-Spoke",
    image: `${assetRoot}/rims/full/RIM_BLACKRED_4SPOKE_FRONT_REAR_LAYER.png`,
    color: "Black Red",
    spoke: "4-spoke",
    frontTyre: "70/90-17",
    rearTyre: "80/90-17",
    estimatedPrice: 900,
  },
  {
    id: "silver-4spoke",
    name: "Silver 4-Spoke",
    image: `${assetRoot}/rims/full/RIM_SILVER_4SPOKE_FRONT_REAR_LAYER.png`,
    color: "Silver",
    spoke: "4-spoke",
    frontTyre: "70/90-17",
    rearTyre: "80/90-17",
    estimatedPrice: 850,
  },
];

export const accessoryLayers: AccessoryLayer[] = [
  {
    id: "gold-accessory",
    name: "Gold Accessory Package",
    image: `${assetRoot}/accessories/full/ACCESSORY_LAYER_GOLD.png`,
    estimatedPrice: 220,
  },
  {
    id: "silver-accessory",
    name: "Silver Accessory Package",
    image: `${assetRoot}/accessories/full/ACCESSORY_LAYER_SILVER.png`,
    estimatedPrice: 180,
  },
];

export const setupPackages: SetupPackage[] = [
  {
    id: "black-burgundy-magenta",
    name: "Black Burgundy x Magenta Rim",
    modelId: "y16zr",
    coversetId: "black-burgundy",
    rimId: "magenta-4spoke",
    accessoryLayerId: "gold-accessory",
    description: "Deep showroom contrast with a bright street rim.",
  },
  {
    id: "black-gold-gold",
    name: "Black Gold x Gold Rim",
    modelId: "y16zr",
    coversetId: "black-gold",
    rimId: "gold-4spoke",
    accessoryLayerId: "gold-accessory",
    description: "Premium black and gold matching finish.",
  },
  {
    id: "yamaha-blue-blackblue",
    name: "Yamaha Blue x Black Blue Rim",
    modelId: "y15zr",
    coversetId: "yamaha-blue",
    rimId: "blackblue-4spoke",
    accessoryLayerId: "silver-accessory",
    description: "Factory-inspired Yamaha blue setup.",
  },
  {
    id: "red-black-blackred",
    name: "Red Black x Black Red Rim",
    modelId: "lc135",
    coversetId: "red-black",
    rimId: "blackred-4spoke",
    accessoryLayerId: "silver-accessory",
    description: "Sharper red accents for a sportier LC look.",
  },
  {
    id: "white-silver",
    name: "White x Silver Rim",
    modelId: "lc135",
    coversetId: "white",
    rimId: "silver-4spoke",
    accessoryLayerId: "silver-accessory",
    description: "Clean white finish with bright silver hardware.",
  },
];
