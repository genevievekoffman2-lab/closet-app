
export type ClothingType = "top" | "bottom" | "shoes" | "accessory" | "outerwear";
export type Warmth = "light" | "medium" | "heavy";

export interface closetItem {
    id: string;
    description: string;
    type: ClothingType;
    warmth: Warmth;
    waterproof: boolean;
    image_url: string;
}

let mockItem: closetItem = {
    id: "23FEX", //TODO add random generator
    description: "Black Flats",
    type: "shoes",
    warmth: "light",
    waterproof: false,
    image_url: '/closetItems/ballet_flats.png'
}