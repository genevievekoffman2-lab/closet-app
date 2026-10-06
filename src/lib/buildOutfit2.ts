/** Build Outfit Logic for V2 using weighted warmths */

import { primary_zone } from "../data/closetItems2"; 
import type { ClosetItem } from "../types/ClosetItem2";
import { getWarmthRanges } from "./getWarmthRange"; 
import { findOutfits } from "./search";

export function buildOutfit2(
    temperature: number,
    precipitation: number,
    humidity: number,
    wind: number
) { 

    //determines warmth windows per zone
    let warmth_ranges = getWarmthRanges(temperature, humidity, wind) 
    //TODO FIX- right now its using the top min warmth on the whole outfit
    let min_warmth = warmth_ranges[0] * 2
    let max_warmth = warmth_ranges[1] * 2
    // multiple by 2 because it considers both top & bottom coverage

    console.log(min_warmth)
    console.log(max_warmth)
    // generate a primary outfit
    const outfits = findOutfits(min_warmth, max_warmth, primary_zone);
 
    if (outfits.length === 0) return null; // nothing fits the range

    //outfits is now a list of all possible outfits meeting minimum total warmth
    
    const chosen_outfit =  outfits[Math.floor(Math.random() * outfits.length)];// pick one at random
    
    return chosen_outfit; 
    
    //TODO accessory and outerwear
    //accessories don't depend on warmth
    //not all outfits need an outerwear
}







 