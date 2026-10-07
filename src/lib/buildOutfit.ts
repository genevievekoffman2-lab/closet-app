/** Build Outfit Logic for V2 using weighted warmths */

import { closet } from "../data/closetItems"; 
import type { ClosetItem } from "../types/ClosetItem.ts";
import { getWarmthRanges } from "./getWarmthRange"; 
import { findOutfits } from "./search";

export function buildOutfit2(
    temperature: number,
    precipitation: number,
    humidity: number,
    wind: number
) { 
    const isRaining = precipitation > 50;
    if (isRaining) {
        console.log('raining...TODO');
    }

    //determines warmth window 
    let warmth_ranges = getWarmthRanges(temperature, humidity, wind) 
    let min_warmth = warmth_ranges[0] * 2 //*2 because it considers both top & btm coverage
    let max_warmth = warmth_ranges[1] * 2 

    let primaryItems = closet.filter((item)=> item.type == "primary");
    // generate a list of possible outfits (primary outfit) meeting min total warmth
    const outfits = findOutfits(min_warmth, max_warmth, primaryItems);
 
    if (outfits.length === 0) return null; // nothing fits the range
    
    //TODO: if raining, select a waterproof shoe
    //TODO Add accessories (& umbrella if raining)
    
    const chosen_outfit: ClosetItem[] =  outfits[Math.floor(Math.random() * outfits.length)];// pick one at random
    
    // might need outerwear
    if (temperature < 60 ) {
        const coats = closet.filter((item) => item.type == "outerwear" && !item.waterproof);  
        const fit_warmth = computeOutfitWarmth(chosen_outfit)
        let gap = max_warmth - fit_warmth
        if (gap>0) { //if base outfit isn't warm enough - we grab a coat
            let coat = coats[Math.floor(Math.random()*coats.length)] // random atm TODO add logic
            chosen_outfit.push(coat);
        } 
    }

    // select accessories : random right now; TODO: add logic
    let chosen_accessory = selectAccessorries();
    chosen_outfit.push(chosen_accessory);

    return chosen_outfit;  
}

function computeOutfitWarmth(outfit: ClosetItem[]): number {
    return outfit.filter((item) => 
        item.type == "primary" && 
        item.occupies.some((slot) => slot.startsWith("top:") || slot.startsWith("bottom"))
    ).reduce((sum, item) => sum + item.warmth, 0);
}

// based on the items in the existing outfit, we select appropriate accessories
function selectAccessorries() {
    //if it is sunny -> we need sunglasses 

    // for now, pick a random bag 
    const bags = closet.filter((item) => item.type == "accessory" && item.category == "bag");  
    let chosen_bag = bags[Math.floor(Math.random()*bags.length)]  

    return chosen_bag;
}