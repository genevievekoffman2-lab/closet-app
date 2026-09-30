import { mockCloset } from "../data/closetItems2";
import type { ClosetItem } from "../types/ClosetItem2";

import { splitByWarmth } from "./buildOutfit2";
import { pickRandom } from "./pickRandom";

export function selectItemsForZone(
    items: ClosetItem[],
    min_warmth: number,
    max_warmth: number
) {

    //split items in the zone into 3 groups based on warmth
    let itemsByRange = splitByWarmth(items, min_warmth, max_warmth); 
    
    //case 1: there are items in in_range, we can randomly select one & be done with this zone
    if (itemsByRange.in_range.length > 0) {
        const chosenItem = pickRandom(itemsByRange.in_range);
        return { primary: chosenItem };
    }

    //case 2: start by selecting a primary item (might need to layer ie add a base)
    if (itemsByRange.too_light.length > 0) {
        	/** pick the closest one to min_warmth 
             * this is the warmest of the too light options 
             * it will need the smallest boost of a base layer to be within the warmth range
             * so we pick a base layer that pushes the total warmth into range */
    
        //pick the item closest to min_warmth
        let primaryItem = itemsByRange.too_light[0];
        for (const item of itemsByRange.too_light) {  
            if (item.warmth > primaryItem.warmth) {
                primaryItem = item; 
            }
        }
        //the amnt of warmth a base layer needs to contribute
        let gap = min_warmth - primaryItem.warmth;  

        //select the base item
        //base item must not be the same item, must be layer = either or base & meet the warmth gap
        const baseCandidates = itemsByRange.too_light.filter((item) => {
            const isBaseRole = item.layer_role == "base" || item.layer_role == "either";
            const isNotChosen = item.id !== primaryItem.id;
            const isWarmEnough = item.warmth >= gap;
            return isBaseRole && isNotChosen && isWarmEnough;
        });

        if (baseCandidates.length > 0) {
            let baseItem = baseCandidates[0];
            for (const item of baseCandidates) {
                if (item.warmth < baseItem.warmth) {
                    baseItem = item;
                }
            }
            return { primary: primaryItem, base: baseItem };
        }
    }

    //case 3: there are no items in_range or too_light -> fall back to heavier items
    //we select the item with the lowest warmth
    if(itemsByRange.too_heavy.length > 0) {
        let lightest = itemsByRange.too_heavy[0];
        for (const item of itemsByRange.too_heavy) {
            if (item.warmth < lightest.warmth) {
                lightest = item;
            }
        }
        return { primary: lightest }; 
    }
 
    return null; //nothing works in closet
}