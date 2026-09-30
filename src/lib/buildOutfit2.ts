/** Build Outfit Logic for V2 using weighted warmths */

import { mockCloset } from "../data/closetItems2";
import type { ClosetItem } from "../types/ClosetItem2";
import type { Outfit } from "../types/Outfit2";
import { getWarmthRanges } from "./getWarmthRange"; 
import { selectItemsForZone } from "./selectItemsForZone";

export function buildOutfit(
    temperature: number,
    precipitation: number,
    humidity: number
) { // TODO what type do we return? 

    //determine warmth level per zone
    let warmth_ranges = getWarmthRanges(temperature, precipitation, humidity)
    
    const upperItems = selectItemsForZone(
        mockCloset.upper,
        warmth_ranges.upper[0],
        warmth_ranges.upper[1]
    );

    const bottomItems = selectItemsForZone(
        mockCloset.bottom,
        warmth_ranges.bottom[0],
        warmth_ranges.bottom[1]
    );

    const footItems = selectItemsForZone(
        mockCloset.foot,
        warmth_ranges.foot[0],
        warmth_ranges.foot[1]
    );
    
    //TODO accessory and outerwear
    //accessories don't depend on warmth
    //not all outfits need an outerwear
}

/** splits all closet pieces within a zone into three ranges based on their warmth  
	in_range[]: all items with warmth < max_warmth & > min_warmth
	too_light[]: all items with warmth < min_warmth
	too_heavy[]: all items with warmth > max_warmth 
    returns the 3 groups */
export function splitByWarmth(items: ClosetItem[], min: number, max: number) {
    let in_range: ClosetItem[] = [];
    let too_light: ClosetItem[] = [];
    let too_heavy: ClosetItem[] = [];

    for (const item of items) {
        if (item.warmth >= min && item.warmth <= max) {
            in_range.push(item);
        } else if (item.warmth < min) {
            too_light.push(item);
        } else {
            too_heavy.push(item);
        }
    }
    return { in_range, too_light, too_heavy };
}




 