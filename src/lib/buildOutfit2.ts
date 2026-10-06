/** Build Outfit Logic for V2 using weighted warmths */

import { primary_zone } from "../data/closetItems2"; 
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
    let min_warmth = warmth_ranges["top"][0]
    let max_warmth = warmth_ranges['top'][1] 
     
    // generate a primary outfit
      const outfits = findOutfits(min_warmth, max_warmth, primary_zone);
 
      if (outfits.length === 0) return null; // nothing fits the range


    // console.log(outfits) THIS IS A LIST OF POSSIBLE OUTFITS
    const chosen_outfit =  outfits[Math.floor(Math.random() * outfits.length)];// pick one at random
    
    return chosen_outfit; 
    
    //TODO accessory and outerwear
    //accessories don't depend on warmth
    //not all outfits need an outerwear
}








 