import type { itemTags } from "./closetItemTags";

export type ClothingType = "top" | "bottom" | "shoes" | "accessory" | "outerwear";
export type Warmth = "light" | "medium" | "heavy";

export interface closetItem {
    id: string;
    description: string;
    type: ClothingType;
    warmth: Warmth[]; //can be many warmth levels
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
    image_url: '/closetItems/ballet_flats.png'
}