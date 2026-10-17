// presets for the Add item form: picking a kind fills type, slots, category and warmth
// keywords: words in the description that preselect this kind

import type { AccessoryCategory, Slot } from "../types/ClosetItem";

export type ItemKind = {
  id: string;
  label: string;
  type: "primary" | "outerwear" | "accessory";
  occupies?: Slot[];
  requires?: Slot[];
  category?: AccessoryCategory;
  warmth: number;
  keywords: string[];
};

export const ITEM_KINDS: ItemKind[] = [
  { id: "top", label: "Tank / blouse / long sleeve", type: "primary", occupies: ["top:1"], warmth: 0.2,
    keywords: ["tank", "blouse", "shirt", "tee", "top", "cami", "sleeve", "longsleeve", "bodysuit"] },
  { id: "sweater", label: "Sweater", type: "primary", occupies: ["top:2"], warmth: 0.4,
    keywords: ["sweater", "cardigan", "hoodie", "sweatshirt", "pullover", "jumper"] },
  { id: "vest", label: "Vest", type: "primary", occupies: ["top:2"], requires: ["top:1"], warmth: 0.2,
    keywords: ["vest"] },
  { id: "pants", label: "Pants / jeans", type: "primary", occupies: ["bottom:0", "bottom:1"], warmth: 0.4,
    keywords: ["pants", "jeans", "slacks", "trousers", "leggings"] },
  { id: "skirt", label: "Skirt / shorts", type: "primary", occupies: ["bottom:1"], warmth: 0.2,
    keywords: ["skirt", "shorts", "skort"] },
  // top:1 = can't wear a top underneath; the form switches it to top:2 when you can
  { id: "dress", label: "Dress", type: "primary", occupies: ["top:1", "bottom:1"], warmth: 0.4,
    keywords: ["dress", "gown"] },
  { id: "tights", label: "Tights", type: "primary", occupies: ["bottom:0", "feet:1"], requires: ["bottom:1"], warmth: 0.2,
    keywords: ["tights", "stockings", "pantyhose"] },
  { id: "socks", label: "Socks", type: "primary", occupies: ["feet:1"], requires: ["feet:2"], warmth: 0,
    keywords: ["socks", "sock"] },
  { id: "shoes", label: "Shoes", type: "primary", occupies: ["feet:2"], warmth: 0,
    keywords: ["shoes", "shoe", "sneakers", "sneaker", "boots", "boot", "heels", "flats", "sandals", "loafers", "mules"] },
  { id: "coat", label: "Coat / jacket", type: "outerwear", warmth: 0.6,
    keywords: ["coat", "jacket", "raincoat", "blazer", "parka", "trench"] },
  { id: "earrings", label: "Earrings", type: "accessory", category: "ear", warmth: 0,
    keywords: ["earrings", "earring", "studs", "hoops"] },
  { id: "necklace", label: "Necklace", type: "accessory", category: "neck", warmth: 0,
    keywords: ["necklace", "chain", "pendant", "scarf"] },
  { id: "headwear", label: "Headwear", type: "accessory", category: "head", warmth: 0,
    keywords: ["hat", "headband", "clip", "beanie", "cap", "beret", "scrunchie"] },
  { id: "sunglasses", label: "Sunglasses", type: "accessory", category: "eyes", warmth: 0,
    keywords: ["sunglasses", "glasses"] },
  { id: "wrist", label: "Watch / bracelet", type: "accessory", category: "wrist", warmth: 0,
    keywords: ["watch", "bracelet", "bangle"] },
  { id: "bag", label: "Bag", type: "accessory", category: "bag", warmth: 0,
    keywords: ["bag", "tote", "handbag", "purse", "clutch", "backpack"] },
  { id: "other", label: "Other", type: "accessory", category: "other", warmth: 0, keywords: [] },
];
