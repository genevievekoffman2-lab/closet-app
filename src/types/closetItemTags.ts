export type Color = 
    | "black"
    | "white"
    | "gray"
    | "navy"
    | "blue"
    | "light blue"
    | "red"
    | "pink"
    | "orange"
    | "yellow"
    | "green"
    | "olive"
    | "purple"
    | "brown"
    | "tan"
    | "beige"
    | "cream"
    | "gold"
    | "silver";
    
export type Pattern = 
    | "solid" 
    | "striped" 
    | "polka dot"
    | "plaid"
    | "floral"
    | "animal print"
    | "checkered"


export interface itemTags {
    colors? : Color[];
    pattern?: Pattern; 
}