/** Mock Data for V2 */
import type { ClosetItem } from "../types/ClosetItem2";

const accessory_zone: ClosetItem[] = [
    { id: "1-accessory", description: "Pearl Earrings", type: "accessory", layer_role: "either", warmth: 0, waterproof: false, image_url: "/closetItems/pearl_earrings.png" },
    { id: "2-accessory", description: "Black Headband", type: "accessory", layer_role: "either", warmth: 0, waterproof: false, image_url: "/closetItems/black_headband.png" },
    { id: "3-accessory", description: "Silk Scarf", type: "accessory", layer_role: "either", warmth: 0, waterproof: false, image_url: "/closetItems/silk_scarf_stripe.png" },
]

const onepiece_zone: ClosetItem[] = [
    { id: "1-op", description: "Mini Jean Dress", type: "one-piece", layer_role: "either", warmth: 0.3, waterproof: false, image_url: "/closetItems/Reformation_jean_mini_dress.png" },
]

const outerwear_zone: ClosetItem[] = [
    { id: "1-outer", description: "Wool Coat", type: "outerwear", layer_role: "primary", warmth: 1, waterproof: false, image_url: "/closetItems/navy_wool_coat.png" },
    { id: "2-outer", description: "Raincoat", type: "outerwear", layer_role: "primary", warmth: 0.5, waterproof: true, image_url: "/closetItems/rains_neutral_raincoat.png" },
]

const upper_zone: ClosetItem[] = [
    { id: "1-top", description: "White Blouse", type: "upper", layer_role: "either", warmth: 0.2, waterproof: false, image_url: "/closetItems/white_light_blouse.png" },
    { id: "2-top", description: "Knit Sweater", type: "upper", layer_role: "either", warmth: 0.5, waterproof: false, image_url: "/closetItems/white_knit_pullover.png" },
    { id: "3-top", description: "Navy Sweater", type: "upper", layer_role: "either", warmth: 0.5, waterproof: false, image_url: "/closetItems/gap_navy_sweater.png" },
]

const bottom_zone: ClosetItem[] = [
    { id: "1-btm", description: "Plaid Mini Skirt", type: "bottom", layer_role: "either", warmth: 0.4, waterproof: false, image_url: "/closetItems/plaid_skirt.png" },
    { id: "2-btm", description: "Leather Shorts", type: "bottom", layer_role: "either", warmth: 0.2, waterproof: false, image_url: "/closetItems/br_leather_shorts.png" },
    { id: "3-btm", description: "Jeans", type: "bottom", layer_role: "primary", warmth: 0.4, waterproof: false, image_url: "/closetItems/light_denim_jeans.png" },
    { id: "4-btm", description: "Polka Dot Skirt", type: "bottom", layer_role: "either", warmth: 0.2, waterproof: false, image_url: "/closetItems/polka_dot_maxi_skirt.png" },
]

const foot_zone: ClosetItem[] =[
    { id: "1-ft", description: "Black Flats", type: "foot", layer_role: "either", warmth: 0.2, waterproof: false, image_url: '/closetItems/ballet_flats.png' },
    { id: "2-ft", description: "Red Kitten Heels", type: "foot", layer_role: "primary", warmth: 0.2, waterproof: false, image_url: "/closetItems/red_kitten_heels.png" },
    { id: "3-ft", description: "Crochet Sandals", type: "foot", layer_role: "primary", warmth: 0.2, waterproof: false, image_url: "/closetItems/crochet_sandals_chanel.png" },
    { id: "4-ft", description: "Rain Boots", type: "foot", layer_role: "either", warmth: 0.4, waterproof: true, image_url: "/closetItems/burberry_rainboots.png" },
    { id: "5-ft", description: "Black Stockings", type: "foot", layer_role: "base", warmth: 0.2, waterproof: false, image_url: "/closetItems/black_stockings.png" },
    { id: "6-ft", description: "Ruffle Socks", type: "foot", layer_role: "base", warmth: 0.1, waterproof: false, image_url: "/closetItems/white_socks_ruffle.png" },
]

// list of closet items
export const mockCloset = {
    upper: upper_zone,
    bottom: bottom_zone,
    "one-piece": onepiece_zone,
    foot: foot_zone,
    accessory: accessory_zone,
    outerwear: outerwear_zone,
}