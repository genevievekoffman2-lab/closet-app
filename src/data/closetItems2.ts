/** Mock Data for V2 */
import type { ClosetItem } from "../types/ClosetItem2";

//shoes must be feet:2
//pants and tights take up bottom 0 
export const closet: ClosetItem[] = [
  { id: "1-accessory", description: "Pearl Earrings", type: "accessory", category: "ear", warmth: 0, waterproof: false, image_url: "/closetItems/pearl_earrings.png" },
  { id: "2-accessory", description: "Black Headband", type: "accessory", category: "head", warmth: 0, waterproof: false, image_url: "/closetItems/black_headband.png" },
  { id: "3-accessory", description: "Silk Scarf", type: "accessory", category: "neck", warmth: 0, waterproof: false, image_url: "/closetItems/silk_scarf_stripe.png" },

  { id: "1-outer", description: "Wool Coat", type: "outerwear", warmth: 1, waterproof: false, image_url: "/closetItems/navy_wool_coat.png" },
  { id: "2-outer", description: "Raincoat", type: "outerwear", warmth: 0.5, waterproof: true, image_url: "/closetItems/rains_neutral_raincoat.png" },
  { id: "3-outer", description: "Barbour Quilted Coat", type: "outerwear", warmth: 0.6, waterproof: false, image_url: "/closetItems/barbour_kilnwick_quilted_jacket.png" },
  { id: "4-outer", description: "Bomber Jacket", type: "outerwear", warmth: 0.6, waterproof: false, image_url: "/closetItems/Dark_beige_jacket.png" },

  { id: "1-top", description: "White Blouse", type: "primary", occupies: ["top:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/white_light_blouse.png" },
  { id: "2-top", description: "Knit Sweater", type: "primary", occupies: ["top:2"], requires: [], warmth: 0.5, waterproof: false, image_url: "/closetItems/white_knit_pullover.png" },
  { id: "3-top", description: "Navy Sweater", type: "primary", occupies: ["top:2"], requires: [], warmth: 0.5, waterproof: false, image_url: "/closetItems/gap_navy_sweater.png" },
  { id: "1-op", description: "Mini Jean Dress", type: "primary", occupies: ["top:2", "bottom:1"], requires: [], warmth: 0.3, waterproof: false, image_url: "/closetItems/Reformation_jean_mini_dress.png" },
  { id: "4-top", description: "Black Tank", type: "primary", occupies: ["top:1"], requires: [], warmth: 0.1, waterproof: false, image_url: "/closetItems/black_tank.png" },
  { id: "5-top", description: "Long Sleeve", type: "primary", occupies: ["top:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/sand_ribbed_long_sleeve.png" },
  { id: "6-top", description: "Sweater Vest", type: "primary", occupies: ["top:2"], requires: ["top:1"], warmth: 0.4, waterproof: false, image_url: "/closetItems/barbour_sweater_vest.png" },

    { id: "0-btm", description: "Black Tights", type: "primary", occupies: ["bottom:0", "feet:0"], requires: ["bottom:1"], warmth: 0.2, waterproof:false, image_url: "/closetItems/black_tights.png"},
    { id: "1-btm", description: "Plaid Mini Skirt", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/plaid_skirt.png" },
  { id: "2-btm", description: "Leather Shorts", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/br_leather_shorts.png" },
  { id: "3-btm", description: "Jeans", type: "primary", occupies: ["bottom:0", "bottom:1"], requires: [], warmth: 0.4, waterproof: false, image_url: "/closetItems/light_denim_jeans.png" },
  { id: "4-btm", description: "Polka Dot Skirt", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/polka_dot_maxi_skirt.png" },
   { id: "5-btm", description: "Black Slacks", type: "primary", occupies: ["bottom:0", "bottom:1"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/black_slacks.png" },
   { id: "6-btm", description: "Micro Skirt", type: "primary", occupies: ["bottom:1"], requires: [], warmth: 0.1, waterproof: false, image_url: "/closetItems/micro_grey_skirt.png" },

  { id: "1-ft", description: "Black Flats", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/ballet_flats.png" },
  { id: "2-ft", description: "Red Kitten Heels", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/red_kitten_heels.png" },
  { id: "3-ft", description: "Crochet Sandals", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.2, waterproof: false, image_url: "/closetItems/crochet_sandals_chanel.png" },
  { id: "4-ft", description: "Rain Boots", type: "primary", occupies: ["feet:2"], requires: [], warmth: 0.4, waterproof: true, image_url: "/closetItems/burberry_rainboots.png" },
  //{ id: "5-ft", description: "Black Stockings", type: "primary", occupies: ["feet:1"], requires: ["feet:2"], warmth: 0.2, waterproof: false, image_url: "/closetItems/black_stockings.png" },
  { id: "6-ft", description: "Ruffle Socks", type: "primary", occupies: ["feet:1"], requires: ["feet:2"], warmth: 0.1, waterproof: false, image_url: "/closetItems/white_socks_ruffle.png" },
];



 
