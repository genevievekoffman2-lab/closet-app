export type ClothingZone = "top" | "bottom" | "feet";// | "accessory" | "outerwear";
type AccessoryCategory = "head" | "ear" | "neck" | "wrist" | "waist" | "bag" | "eyes" | "other";

export type ClosetItem = PrimaryItem | OuterwearItem | AccessoryItem

// a spot in the outfit
export type Slot = `${ClothingZone}:${number}` //ex: "top:1", "feet:2"

interface BaseItem {
  id: string;
  description: string; 
  image_url: string;  
  warmth: number; // 0-1 
  waterproof: boolean;
  tags?: string[]; 
}

export interface PrimaryItem extends BaseItem {
  type: "primary";
  occupies: Slot[]; // the zones and depths it occupies
  requires: Slot[]; // the slots it requires to be worn
}

//TODO extend
interface AccessoryItem extends BaseItem {
  type: "accessory";
  category: AccessoryCategory;
}

interface OuterwearItem extends BaseItem {
  type: "outerwear";
}

