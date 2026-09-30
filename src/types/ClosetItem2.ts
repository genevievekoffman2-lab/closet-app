/** Designed for Version 2 (using warmth numbers) */

export type ClothingZone = "upper" | "bottom" | "one-piece" | "foot" | "accessory" | "outerwear";
export type LayerRole = "primary" | "base" | "either";
// only worn alone → "primary"
// worn alone OR as a layer under smtng else → "either"
// only worn with smtng else → "base"

export interface ClosetItem {
  id: string;
  description: string;
  type: ClothingZone;
  layer_role: LayerRole;  
  warmth: number; // 0-1; irrelevant for accessory items
  waterproof: boolean;
  image_url: string;
}