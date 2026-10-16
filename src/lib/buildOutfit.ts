/** Build Outfit Logic for V2 using weighted warmths */

import type { ClosetItem } from "../types/ClosetItem.ts";
import { getWarmthRanges } from "./getWarmthRange"; 
import { findOutfits } from "./search";
import { pickRandom } from "./pickRandom";

const NEUTRALS = ["black", "white", "cream", "ivory", "gray", "navy", "beige", "tan", "brown"];

export function buildOutfit2(
    closet: ClosetItem[],
    temperature: number,
    precipitation: number,
    humidity: number,
    wind: number
) { 
    const isRaining = precipitation > 50;
    // raining: shoes (feet:2) and outerwear must be waterproof
    // not raining: skip anything rain-only
    const rainOk = (item: ClosetItem) => isRaining
        ? item.waterproof || !(item.type == "outerwear" || (item.type == "primary" && item.occupies.includes("feet:2")))
        : !item.tags?.includes("weather:rain");

    //determines warmth window 
    let warmth_ranges = getWarmthRanges(temperature, humidity, wind) 
    let min_warmth = warmth_ranges[0] * 2 //*2 because it considers both top & btm coverage
    let max_warmth = warmth_ranges[1] * 2 

    let primaryItems = closet.filter((item)=> item.type == "primary").filter(rainOk);
    // generate a list of possible outfits (primary outfit) meeting min total warmth
    const outfits = findOutfits(min_warmth, max_warmth, primaryItems);
 
    if (outfits.length === 0) return null; // nothing fits the range
    
    //TODO Add umbrella if raining
    
    const chosen_outfit: ClosetItem[] =  outfits[Math.floor(Math.random() * outfits.length)];
    // pick one at random
    
    // check if we need outerwear
    if (temperature < 60 ) {
        const coats = closet.filter((item) => item.type == "outerwear" && rainOk(item));  
        const fit_warmth = computeOutfitWarmth(chosen_outfit)
        let gap = max_warmth - fit_warmth
        if (gap>0) { //if base outfit isn't warm enough - we grab a coat
            //let coat = coats[Math.floor(Math.random()*coats.length)] // random atm TODO add logic
            let coat = coats.reduce((best, current) => //chose the coat closest to warmth gap
            Math.abs(current.warmth - gap) < Math.abs(best.warmth - gap) ? current : best
            );
            chosen_outfit.push(coat);
        } 
    }

    // select accessories : random right now; TODO: add logic
    let chosen_accessory = selectAccessorries(closet);
    chosen_outfit.push(chosen_accessory);

    // one more accessory, picked last so it can match everything above
    const extra_accessory = selectAccessory(closet, chosen_outfit);
    if (extra_accessory) chosen_outfit.push(extra_accessory);

    return chosen_outfit;
}

// values of key:value tags, ex: tagValues(items, "color") -> ["navy", "white"]
function tagValues(items: ClosetItem[], key: string): string[] {
    return items.flatMap((item) => item.tags ?? [])
        .filter((tag) => tag.startsWith(key + ":"))
        .map((tag) => tag.split(":")[1]);
}

// picks a non-bag accessory based on the outfit's tags (items without tags are ignored):
// 1. outfit has a pattern -> accessory with the same pattern
// 2. all colors neutral -> accessory with a pattern or a non-neutral color
// 3. otherwise -> accessory sharing a color with the outfit
// returns undefined if nothing matches
function selectAccessory(closet: ClosetItem[], outfit: ClosetItem[]) {
    const options = closet.filter((item) =>
        item.type == "accessory" && item.category != "bag" && !item.tags?.includes("weather:rain"));
    const patterns = tagValues(outfit, "pattern").filter((p) => p != "solid");
    const colors = tagValues(outfit, "color");

    let matches: ClosetItem[];
    if (patterns.length > 0) {
        matches = options.filter((a) => tagValues([a], "pattern").some((p) => patterns.includes(p)));
    } else if (colors.every((c) => NEUTRALS.includes(c))) {
        matches = options.filter((a) =>
            tagValues([a], "pattern").some((p) => p != "solid") ||
            tagValues([a], "color").some((c) => !NEUTRALS.includes(c)));
    } else {
        matches = options.filter((a) => tagValues([a], "color").some((c) => colors.includes(c)));
    }
    return pickRandom(matches);
}

function computeOutfitWarmth(outfit: ClosetItem[]): number {
    return outfit.filter((item) => 
        item.type == "primary" && 
        item.occupies.some((slot) => slot.startsWith("top:") || slot.startsWith("bottom"))
    ).reduce((sum, item) => sum + item.warmth, 0);
}

// based on the items in the existing outfit, we select appropriate accessories
function selectAccessorries(closet: ClosetItem[]) {
    //if it is sunny -> we need sunglasses 

    // for now, pick a random bag 
    const bags = closet.filter((item) => item.type == "accessory" && item.category == "bag");  
    let chosen_bag = bags[Math.floor(Math.random()*bags.length)]  

    return chosen_bag;
}