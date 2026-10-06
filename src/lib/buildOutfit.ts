/** Logic to build an outfit given the temperature conditions */

import type { Outfit } from "../types/outfit";
import { groupItemsToCloset } from "./groupClosetItems";
import { mockCloset } from "../data/closetItems";
import type { closetItem } from "../types/closetItem";
import type { Warmth } from "../types/closetItem";

/**  
 * for V1: closetItems are in a dictionary of tops, bottoms, shoes, etc with key=warmth
 * later versions will be in database and I'll query based on warmth
 */

// returns an outfit or null
const groupedCloset = groupItemsToCloset(mockCloset); //uses set mock data for V1

export function buildOutfit(
    temperature: number,
    precipitation: number
): Outfit | null {

    const warmth = determineWarmth(temperature); 

    // for now, choses randomly
    let selected_top = pickRandom(groupedCloset.tops[warmth]); 
    let selected_bottom = pickRandom(groupedCloset.bottoms[warmth]); 
    let selected_shoes = pickRandom(groupedCloset.shoes[warmth]); 
    let selected_accessory = pickRandom(groupedCloset.accessories[warmth]); 
    let selected_outerwear;

    //if it is raining, select an outerwear
    // TODO: add umbrella to accessory 
    // TODO: select a water proof pair of shoes
    if (precipitation > 50) {
        selected_outerwear = pickRandom(groupedCloset.outerwear[warmth]);
    }
    
    if (!selected_top || !selected_bottom || !selected_shoes || !selected_accessory) {
        return null; //TODO show "missing item" alert
    }

    const selectedOutfit: Outfit = {
        top : selected_top,
        bottom: selected_bottom,
        shoes: selected_shoes,
        accessory: selected_accessory,
        outerwear: selected_outerwear
    }

    return selectedOutfit;
}



//based on temperature, determines the warmth needed for clothing items
function determineWarmth(temperature: number): Warmth {
    if (temperature > 70) return "light";
    if (temperature < 40) return "heavy";
    return "medium";
}


// for V1, we chose a random item in the category otherwise return undefined if it dne
function pickRandom(items: closetItem[]): closetItem | undefined {
    if (items.length === 0) return undefined;
    return items[Math.floor(Math.random() * items.length)];
}