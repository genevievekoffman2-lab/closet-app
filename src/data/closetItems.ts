// contains mock data for closet items 
import type { closetItem } from "../types/closetItem";


// list of closet items
export const mockCloset: closetItem[] = [
    { id: "23FEX", description: "Black Flats", type: "shoes", warmth: ["light", "medium"], warmth_value: 0.1, waterproof: false, image_url: '/closetItems/ballet_flats.png' , tags: { colors: ["black"], pattern: "solid" }},
    { id: "892AB", description: "Rain Boots", type: "shoes", warmth: ["light","medium"], warmth_value: 0.3, waterproof: true, image_url: "/closetItems/burberry_rainboots.png" , tags: { colors: ["tan", "black"], pattern: "plaid" }},
    { id: "220JK", description: "Red Kitten Heels", type: "shoes", warmth: ["light"], warmth_value: 0.1, waterproof: false, image_url: "/closetItems/red_kitten_heels.png", tags: { colors: ["red"], pattern: "solid" }}, 
    { id: "09KKL", description: "Crochet Sandals", type: "shoes", warmth: ["medium", "light"], warmth_value: 0.1, waterproof: false, image_url: "/closetItems/crochet_sandals_chanel.png" , tags: { colors: ["cream"], pattern: "solid" }},

    { id: "90KKB", description: "Striped Longsleeve", type: "top", warmth: ["medium", "light"], warmth_value: 0.5, waterproof: false, image_url: "/closetItems/oversized_blue_striped_longsleeve.png" , tags: { colors: ["blue", "white"], pattern: "striped" }},
    { id: "KLM78", description: "Black Tank", type: "top", warmth: ["light"], warmth_value: 0.1, waterproof: false, image_url: "/closetItems/basic_black_tank.png" , tags: { colors: ["black"], pattern: "solid" }},

    { id: "890KI", description: "White Blouse", type: "top", warmth: ["light"], warmth_value: 0.2, waterproof: false, image_url: "/closetItems/white_light_blouse.png" , tags: { colors: ["white"], pattern: "solid" }},
    { id: "873NO", description: "Knit Sweater", type: "top", warmth: ["medium", "heavy"], warmth_value: 0.7, waterproof: false, image_url: "/closetItems/white_knit_pullover.png", tags: { colors: ["white"], pattern: "solid" } },
    { id: "287KK", description: "Plaid Mini Skirt", type: "bottom", warmth: ["medium"], warmth_value: 0.4, waterproof: false, image_url: "/closetItems/plaid_skirt.png" , tags: { colors: ["brown", "black"], pattern: "plaid" }},
    { id: "890KI", description: "Wool Coat", type: "outerwear", warmth: ["heavy"], warmth_value: 1, waterproof: false, image_url: "/closetItems/navy_wool_coat.png" , tags: { colors: ["navy"], pattern: "solid" }},
    { id: "8765PO", description: "Pearl Earrings", type: "accessory", warmth: ["medium","light", "heavy"], waterproof: false, image_url: "/closetItems/pearl_earrings.png", tags: { colors: ["brown"], pattern: "solid" } },
    { id: "90MNO", description: "Leather Shorts", type: "bottom", warmth: ["light"], warmth_value: 0.2, waterproof: false, image_url: "/closetItems/br_leather_shorts.png" },
    { id: "99LLO", description: "Polka Dot Skirt", type: "bottom", warmth: ["medium"], warmth_value: 0.2, waterproof: false, image_url: "/closetItems/polka_dot_maxi_skirt.png" },
    { id: "008KK", description: "Black Headband", type: "accessory", warmth: ["medium","light", "heavy"], waterproof: false, image_url: "/closetItems/black_headband.png" },
    { id: "138LP", description: "Raincoat", type: "outerwear", warmth: ["medium", "light"],warmth_value: 0.4, waterproof: true, image_url: "/closetItems/rains_neutral_raincoat.png" },
    { id: "06EJK", description: "Navy Sweater", type: "top", warmth: ["medium", "heavy"], warmth_value: 0.7, waterproof: false, image_url: "/closetItems/gap_navy_sweater.png" },
    { id: "762JJ", description: "Jeans", type: "bottom", warmth: ["medium", "heavy"], warmth_value: 0.5, waterproof: false, image_url: "/closetItems/light_denim_jeans.png" },
    { id: "908NM", description: "Silk Scarf", type: "accessory", warmth: ["medium", "light"], waterproof: false, image_url: "/closetItems/silk_scarf_stripe.png", tags: { colors: ["navy", "white"], pattern: "striped" }  },
 
]



