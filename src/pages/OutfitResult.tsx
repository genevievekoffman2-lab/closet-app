import './OutfitResult.css'
import type { ClosetItem } from '../types/ClosetItem.ts';
import { useState } from 'react';
import { Carousel } from "../components/carousel.tsx";
import { fetchOptions } from '../lib/outfitUtils.ts';

type props = { 
    outfit: ClosetItem[] | null;
    setOutfit: (outfit: ClosetItem[] | null) => void;
    setPage: (page: "home" | "closet" | "result") => void;
};

export interface OutfitSections {
  outerwear: ClosetItem[];
  top: ClosetItem[];
  bottom: ClosetItem[];
  feet: ClosetItem[];
  bag: ClosetItem[];
  hasDress: boolean;
}

 // splits the outfits item into sections so we can present by them
export function groupOutfit(outfit: ClosetItem[]): OutfitSections {
  const s: OutfitSections = { outerwear: [], top: [], bottom: [], feet: [], bag: [], hasDress: false };

  for (const item of outfit) {
    if (item.type === "outerwear") s.outerwear.push(item);
    else if (item.type === "accessory") {
      if (item.category === "bag") s.bag.push(item); // other accessories ignored for now
    } else {
      const coversTop = item.occupies.some((slot) => slot.startsWith("top:"));
      const coversBottom = item.occupies.some((slot) => slot.startsWith("bottom:"));
      if (coversTop && coversBottom) s.hasDress = true;

      if (coversTop) s.top.push(item);
      else if (coversBottom) s.bottom.push(item); // tights land here
      else s.feet.push(item);
    }
  }
  return s;
}
 
function Section({ items, onSwap }: { items: ClosetItem[]; onSwap: (oldItem: ClosetItem, newItem: ClosetItem) => void }) {
  const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemOptions, setItemOptions] = useState<ClosetItem[] | null>(null);
  const [index, setIndex] = useState(0); // which option the carousel is showing

  const handleImageClick = async (item: ClosetItem) => {
    setSelectedItem(item);
    setItemOptions(null);      // clear options from a previous item
    setIndex(0);               // start on the selected item itself
    setShowOverlay(true);

    try {
      // fetch options to display
      const options = await fetchOptions(item);
      setItemOptions(options);
      console.log(options)
    } catch (err) {
      console.error("Failed to fetch options", err);
    }
  };

  return (
    <>
      {items.map((item) => {
        const isSelected = showOverlay && selectedItem?.id === item.id;

        return (
          <div key={item.id} className="card">
            {isSelected && itemOptions ? (
              <div onClick={()=>setShowOverlay(false)}>
                {itemOptions ? 
                  <>
                    {/* both buttons bubble up to the wrapper div, which closes the carousel */}
                    <button className="card-action card-action-left">✕</button>
                    <button className="card-action card-action-right" onClick={() => {
                      if (selectedItem) onSwap(selectedItem, itemOptions[index]);
                    }}>✓</button>

                    < Carousel items={itemOptions} index={index} setIndex={setIndex}/>
                  </>
                  : 
                  <p>Loading…</p>} 
              </div>
            ) : (
              <img src={item.image_url} alt={item.description} onClick={() => handleImageClick(item)}/>  
            )}
          </div>
        )})}
       
         

    </>
  );
}

export default function OutfitResult({outfit, setOutfit, setPage}: props) {
    if (!outfit) return <p>No outfit found for this weather.</p>;
    const s = groupOutfit(outfit);

    // replace the exact object (not by id) so duplicate ids can't swap the wrong item
    const swap = (oldItem: ClosetItem, newItem: ClosetItem) =>
        setOutfit(outfit.map((i) => (i === oldItem ? newItem : i)));

    return ( 
        <div>
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a>
       
          <div className="outfit-box"> 

            <div className="columnContainer">
              <Section items={s.outerwear} onSwap={swap} /> 
              <Section items={s.bag} onSwap={swap} /> 
            </div>

            <div className="columnContainer middle">
              {s.hasDress ? ( 
                  <Section items={[...s.top, ...s.bottom]} onSwap={swap} /> 
                ) : (
                <> 
                  <Section items={s.top} onSwap={swap} /> 
                  <Section items={s.bottom} onSwap={swap} /> 
                </>
              )}
            </div>

            <div className="columnContainer"> 
                <Section items={s.feet} onSwap={swap} /> 
            </div>
          
      </div>

     </div>
    )
}