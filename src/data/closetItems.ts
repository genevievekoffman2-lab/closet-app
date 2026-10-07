/** Mock Data for V2 */
import type { ClosetItem } from "../types/closetItem";

//shoes must be feet:2
//pants and tights take up bottom 0 
export const closet: ClosetItem[] = [
  { id: "1-accessory", description: "Pearl Earrings", type: "accessory", category: "ear", warmth: 0, waterproof: false, image_url: "/closetItems/pearl_earrings.png" },
  { id: "2-accessory", description: "Black Headband", type: "accessory", category: "head", warmth: 0, waterproof: false, image_url: "/closetItems/black_headband.png", tags: ["color:black"] },
  { id: "3-accessory", description: "Silk Scarf", type: "accessory", category: "neck", warmth: 0, waterproof: false, image_url: "/closetItems/silk_scarf_stripe.png", tags: ["pattern:striped", "color:orange", "color:brown", "material:silk"] },
  { id: "4-accessory", description: "Black Sunglasses", type: "accessory", category: "eyes", warmth: 0, waterproof: false, image_url: "/closetItems/black_sunglasses.png", tags: ["color:black"] },
  { id: "5-accessory", description: "Umbrella", type: "accessory", category: "other", warmth: 0, waterproof: true, image_url: "/closetItems/umbrella.png"},

  { id: "1-bag", description: "Navy Tote", type: "accessory", category: "bag", warmth: 0, waterproof: false, image_url: "/closetItems/longchamp_navy_tote.png", tags: ["pattern:solid", "color:navy", "brand:longchamp"] },
  { id: "2-bag", description: "Red Handbag", type: "accessory", category: "bag", warmth: 0, waterproof: false, image_url: "/closetItems/mini_red_leather_bag.png", tags: ["pattern:solid", "color:red"] },
  { id: "3-bag", description: "Polka Dot Tote", type: "accessory", category: "bag", warmth: 0, waterproof: false, image_url: "/closetItems/polka_dot_tote.png", tags: ["pattern:polka dot", "color:black", "color:white"] },
  { id: "4-bag", description: "Brown Suede Bag", type: "accessory", category: "bag", warmth: 0, waterproof: false, image_url: "/closetItems/Brown_suede_bag.png", tags: ["pattern:solid", "color:brown", "material:suede"] },
  { id: "5-bag", description: "Black Tote", type: "accessory", category: "bag", warmth: 0, waterproof: false, image_url: "/closetItems/Black_Messenger_bag.png", tags: ["pattern:solid", "color:black"] },
  { id: "6-bag", description: "Black Handbag", type: "accessory", category: "bag", warmth: 0, waterproof: false, image_url: "/closetItems/coach_black_bag.png", tags: ["pattern:solid", "color:black", "brand:Coach"] },



  { id: "1-outer", description: "Wool Coat", type: "outerwear", warmth: 1, waterproof: false, image_url: "/closetItems/navy_wool_coat.png", tags:["color:navy","pattern:solid"]},
  { id: "2-outer", description: "Raincoat", type: "outerwear", warmth: 0.5, waterproof: true, image_url: "/closetItems/rains_neutral_raincoat.png" },
  { id: "3-outer", description: "Quilted Coat", type: "outerwear", warmth: 0.6, waterproof: false, image_url: "/closetItems/barbour_kilnwick_quilted_jacket.png", tags:["brand:Barbour"]},
  { id: "4-outer", description: "Bomber Jacket", type: "outerwear", warmth: 0.6, waterproof: false, image_url: "/closetItems/Dark_beige_jacket.png" },

  { id: "1-top", description: "White Blouse", type: "primary", occupies: ["top:1"], requires: [], warmth: 0.1, waterproof: false, image_url: "/closetItems/white_light_blouse.png", tags:["color:white"] },
  { id: "2-top", description: "Knit Sweater", type: "primary", occupies: ["top:2"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/white_knit_pullover.png" },
  { id: "3-top", description: "Navy Sweater", type: "primary", occupies: ["top:2"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/gap_navy_sweater.png" },
  { id: "1-op", description: "Mini Jean Dress", type: "primary", occupies: ["top:2", "bottom:1"], requires: [], warmth: 0.3, waterproof: false, image_url: "/closetItems/Reformation_jean_mini_dress.png", tags: ["pattern:solid", "color:blue", "brand:Reformation"]},
  { id: "2-op", description: "Polo Dress", type: "primary", occupies: ["top:1", "bottom:1"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/Black_polo_dress.png", tags: ["pattern:solid", "color:black"]},

  { id: "4-top", description: "Black Tank", type: "primary", occupies: ["top:1"], requires: [], warmth: 0, waterproof: false, image_url: "/closetItems/basic_black_tank.png" },
  { id: "5-top", description: "Long Sleeve", type: "primary", occupies: ["top:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/sand_ribbed_long_sleeve.png" },
  { id: "6-top", description: "Sweater Vest", type: "primary", occupies: ["top:2"], requires: ["top:1"], warmth: 0.3, waterproof: false, image_url: "/closetItems/barbour_sweater_vest.png" },
  { id: "7-top", description: "Plaid Sweater Vest", type: "primary", occupies: ["top:2"], requires: ["top:1"], warmth: 0.3, waterproof: false, image_url: "/closetItems/plaid_sweater_vest.png",tags: ["pattern:plaid", "color:red", "color:white", "length:cropped"] },
  { id: "8-top", description: "Striped Longsleeve", type: "primary", occupies: ["top:1", "top:2"], requires: [], warmth: 0.3, waterproof: false, image_url: "/closetItems/oversized_blue_striped_longsleeve.png",tags: ["pattern:striped", "color:blue", "color:white"] },


  { id: "0-btm", description: "Black Tights", type: "primary", occupies: ["bottom:0", "feet:0"], requires: ["bottom:1"], warmth: 0.2, waterproof:false, image_url: "/closetItems/black_tights.png"},
  { id: "1-btm", description: "Plaid Mini Skirt", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/plaid_skirt.png" },
  { id: "2-btm", description: "Leather Shorts", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/br_leather_shorts.png" },
  { id: "3-btm", description: "Jeans", type: "primary", occupies: ["bottom:0", "bottom:1"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/light_denim_jeans.png" , tags: ["pattern:solid", "color:blue"]},
  { id: "4-btm", description: "Polka Dot Skirt", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/polka_dot_maxi_skirt.png", tags: ["pattern:polka dot", "color:black", "color:white"] },
  { id: "5-btm", description: "Black Slacks", type: "primary", occupies: ["bottom:0", "bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/black_slacks.png" , tags: ["pattern:solid", "color:black"]},
  { id: "5.5-btm", description: "Beige Slacks", type: "primary", occupies: ["bottom:0", "bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/beige_slacks.png" , tags: ["pattern:solid", "color:beige"]},

   { id: "6-btm", description: "Micro Skirt", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.1, waterproof: false, image_url: "/closetItems/micro_grey_skirt.png", tags: ["pattern:solid", "color:gray"] },
   { id: "7-btm", description: "Sheer Tights", type: "primary", occupies: ["bottom:0", "feet:0"], requires: ["bottom:1"], warmth: 0.2, waterproof: false, image_url: "/closetItems/sheer_tights.png" },

  { id: "1-ft", description: "Black Flats", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/black_ballet_flats.png" },
  { id: "2-ft", description: "Red Kitten Heels", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/red_kitten_heels.png" },
  { id: "3-ft", description: "Crochet Sandals", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/crochet_sandals_chanel.png" },
  //{ id: "4-ft", description: "Rain Boots", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.4, waterproof: true, image_url: "/closetItems/burberry_rainboots.png" },
  { id: "6-ft", description: "Ruffle Socks", type: "primary", occupies: ["feet:1"], requires: ["feet:2"], warmth: 0.1, waterproof: false, image_url: "/closetItems/white_socks_ruffle.png" },
  
  

];



 
