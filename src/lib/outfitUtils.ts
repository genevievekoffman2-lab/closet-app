// contains helper func for outfits

import { closet } from "../data/closetItems";
import type { ClosetItem, PrimaryItem } from "../types/ClosetItem";


// compares two primaryItems and returns true if they occupy the same slot
function sameSlots(a: PrimaryItem, b: PrimaryItem): boolean {
  return (
    a.occupies.length === b.occupies.length &&
    a.occupies.every((slot) => b.occupies.includes(slot))
  );
}

// given an item, it grabs all the items it can be replaced with (type or filters further)
// ex: if accessory, for now, it grabs all accessories
// if type = primary, it needs to make sure the occupies slot is the same (sneakers and blouses are both primary)
export function fetchOptions(selectedItem: ClosetItem): ClosetItem[] {
  
  const others = closet.filter((item) => {
    if (item.id === selectedItem.id) return false;
    //^we add the selected item back at the front so its presented first
    if (item.type !== selectedItem.type) return false; 


    //if type = primary (we need to filter by occupies slot)
    if (item.type === "primary" && selectedItem.type === "primary") {
      return sameSlots(item, selectedItem);
    }

    //if type == accessory, we want to filter further by category (ex: 'ear' 'bag')
    if (item.type === "accessory" && selectedItem.type === "accessory") {
      return item.category === selectedItem.category;
    }

    return true; // outerwear/accessories: same type is enough
  }); 

  return [selectedItem, ...others];
}
