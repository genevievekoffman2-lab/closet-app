import './OutfitResult.css'
import type { ClosetItem } from '../types/ClosetItem.ts';
import { useState } from 'react';
import { Carousel } from "../components/carousel.tsx";
import { fetchOptions } from '../lib/outfitUtils.ts';

type props = { 
    outfit: ClosetItem[] | null;
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
 
function Section({ items }: { items: ClosetItem[] }) {
  const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [itemOptions, setItemOptions] = useState<ClosetItem[] | null>(null);

  const handleImageClick = async (item: ClosetItem) => {
    setSelectedItem(item);
    setItemOptions(null);      // clear options from a previous item
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
        const todoAlert = () => alert("Logic Coming Soon");

        return (
          <div key={item.id} className="card">
            {isSelected && itemOptions ? (
              <div onClick={()=>setShowOverlay(false)}>
                {itemOptions ? 
                  <>
                    <button className="card-action card-action-left" onClick={() => {/* cancel */ todoAlert()}}>✕</button>
                    <button className="card-action card-action-right" onClick={() => {/* confirm */todoAlert() }}>✓</button>

                    < Carousel items={itemOptions}/> 
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

export default function OutfitResult({outfit, setPage}: props) {   
    if (!outfit) return <p>No outfit found for this weather.</p>;
    const s = groupOutfit(outfit); 
    
    return ( 
        <div>
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a>
       
          <div className="outfit-box"> 

            <div className="columnContainer">
              <Section items={s.outerwear} /> 
              <Section items={s.bag} /> 
            </div>

            <div className="columnContainer middle">
              {s.hasDress ? ( 
                  <Section items={[...s.top, ...s.bottom]} /> 
                ) : (
                <> 
                  <Section items={s.top}/> 
                  <Section items={s.bottom} /> 
                </>
              )}
            </div>

            <div className="columnContainer"> 
                <Section items={s.feet} /> 
            </div>
          
      </div>

     </div>
    )
}