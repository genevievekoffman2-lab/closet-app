/** Groups closet items into dictionary with keys = warmth */

import type { Warmth } from "../types/closetItem";
import type { closetItem } from "../types/closetItem";

export type WarmthDictionary = Record<Warmth, closetItem[]>;
/** warmth: light, medium, heavy */

export type GroupedCloset = {
    tops: WarmthDictionary;
    bottoms: WarmthDictionary;
    shoes: WarmthDictionary;
    accessories: WarmthDictionary;
    outerwear: WarmthDictionary;
}

function emptyWarmthDictionary(): WarmthDictionary {
    return { light: [], medium: [], heavy: [] };
}

export function groupItemsToCloset(closet: closetItem[] = []): GroupedCloset {

    const groupedCloset = {
        tops: emptyWarmthDictionary(),
        bottoms: emptyWarmthDictionary(),
        shoes: emptyWarmthDictionary(),
        accessories: emptyWarmthDictionary(),
        outerwear: emptyWarmthDictionary(),
    };

    //iterate thru each closetItem in closet and add to correct dictionary 
    for (const item of closet) {
        switch(item.type) { 
            case "top": 
                for (const w of item.warmth) {
                    groupedCloset.tops[w].push(item);
                }
                break;
            case "bottom":
                for (const w of item.warmth) {
                    groupedCloset.bottoms[w].push(item);
                }
                break;
            case "shoes":
                for (const w of item.warmth) {
                    groupedCloset.shoes[w].push(item);
                }
                break;
            case "accessory":
                for (const w of item.warmth) {
                    groupedCloset.accessories[w].push(item);
                }
                break;
            case "outerwear":
                for (const w of item.warmth) {
                    groupedCloset.outerwear[w].push(item);
                }
                break;
        }
    }

    return groupedCloset;
}
