export const POSITIONS = [
  "GK",
  "CB",
  "LB",
  "RB",
  "CDM",
  "CM",
  "CAM",
  "LW",
  "RW",
  "ST",
  "CF",
] as const;

export type Position = typeof POSITIONS[number];

export interface PlayerData {
  name: string;
  overallRating: number;
  position: Position;
  club: string;
  imageUrl: string;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
}