import type { closetItem } from './closetItem'


//TODO add dress as an alternative to top & bottom 
export interface Outfit { 
    top: closetItem;
    bottom: closetItem;
    shoes: closetItem;
    accessory: closetItem;
    outerwear?: closetItem;
}