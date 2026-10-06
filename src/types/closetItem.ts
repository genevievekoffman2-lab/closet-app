import type { itemTags } from "./closetItemTags";

export type ClothingType = "top" | "bottom" | "shoes" | "accessory" | "outerwear";
export type Warmth = "light" | "medium" | "heavy";

export interface closetItem {
    id: string;
    description: string;
    type: ClothingType;
    warmth: Warmth[]; //can be many warmth levels
    warmth_value?: number; //0-1 (0 being no warmth vs 1 highest warmth) 
    waterproof: boolean;
    image_url: string;
    tags?: itemTags;
}

let mockItem: closetItem = {
    id: "23FEX", 
    description: "Black Flats",
    type: "shoes",
    warmth: ["light"],
    waterproof: false,
    warmth_value: 0.2,
    image_url: '/closetItems/ballet_flats.png'
}