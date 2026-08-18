export type MotorModelId = "y16zr" | "y15zr";

export type RimModelId =
  | "lcv8_5spoke"
  | "six_spoke_sport"
  | "y_spoke_racing"
  | "ten_spoke_track"
  | "split_spoke_forged";

export type CoverSetId =
  | "cyan_black"
  | "red_black_white"
  | "white_red"
  | "green_black"
  | "blue_silver"
  | "grey_gold"
  | "cyan_orange"
  | "dark_orange"
  | "mx_blue"
  | "sniper_mx_2015_white_red";

export type RimColorId = "magenta" | "blue" | "red" | "orange_gold" | "gold";

export type ShowroomPreviewAsset = {
  id: string;
  motorModelId: MotorModelId;
  coverSetId: CoverSetId;
  rimModelId: RimModelId;
  rimColorId: RimColorId;
  previewImage: string;
};

