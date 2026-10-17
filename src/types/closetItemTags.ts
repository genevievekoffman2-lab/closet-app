export const COLORS = [
    "black",
    "white",
    "gray",
    "navy",
    "blue",
    "light-blue",
    "red",
    "burgundy",
    "pink",
    "orange",
    "yellow",
    "green",
    "olive",
    "purple",
    "brown",
    "tan",
    "beige",
    "cream",
    "gold",
    "silver",
] as const;

export const PATTERNS = [
    "solid",
    "striped",
    "polka dot",
    "plaid",
    "floral",
    "animal",
    "checkered",
    "lace",
    "crochet",
] as const;

export type Color = typeof COLORS[number];
export type Pattern = typeof PATTERNS[number];

export interface itemTags {
    colors? : Color[];
    pattern?: Pattern;
}
