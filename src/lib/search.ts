// input: min_temp, max_temp, items (all primary items)
/* outputs: a list of valid outfits (each outfit = set of items)
        [
            [tee, jeans, sneakers], 
            [dress, boots], 
            [tee, sweater vest, skirt, sandals],
        ]
*/

import type { ClothingZone, PrimaryItem } from "../types/ClosetItem2";

type Outfit = PrimaryItem[];

function isValid(outfit: Outfit, minWarmth: number, maxWarmth: number): boolean {
  const occupied = outfit.flatMap((item) => item.occupies);
  const warmth = outfit.reduce((sum, item) => sum + item.warmth, 0);

  const hasAllZones = (["top", "bottom", "feet"] as ClothingZone[]).every((zone) =>
    occupied.some((slot) => slot.startsWith(zone + ":"))
  );
  const warmthOk = warmth >= minWarmth && warmth <= maxWarmth;
  const requiresMet = outfit.every((item) => item.requires.every((slot) => occupied.includes(slot)));

  return hasAllZones && warmthOk && requiresMet;
}

export function findOutfits(minWarmth: number, maxWarmth: number, items: PrimaryItem[]): Outfit[] {
  const results: Outfit[] = [];

  // for each item: try the outfit with it, then without it
  function search(i: number, outfit: Outfit) {
    if (i === items.length) {
      if (isValid(outfit, minWarmth, maxWarmth)) results.push(outfit);
      return;
    }

    const item = items[i];
    const slotTaken = outfit.some((o) => o.occupies.some((s) => item.occupies.includes(s)));
    if (!slotTaken) search(i + 1, [...outfit, item]); // with item
    search(i + 1, outfit);                            // without item
  }

  search(0, []);
  return results;
}