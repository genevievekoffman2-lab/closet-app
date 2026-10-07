import './OutfitResult.css'
import type { ClosetItem } from '../types/closetItem';

//for V2 -> with layering ; CLAUDE generated code

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
  return (
    <>
      {items.map((item) => (
        <img key={item.id} src={item.image_url} alt={item.description} className="item" />
      ))}
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
       
        <div className="outfit-layout">
        <div className="section outerwear"><Section items={s.outerwear} /></div>

      {s.hasDress ? (
        <div className="section dress"><Section items={[...s.top, ...s.bottom]} /></div>
      ) : (
        <>
          <div className="section top"><Section items={s.top} /></div>
          <div className="section bottom"><Section items={s.bottom} /></div>
        </>
      )}

      <div className="section bag"><Section items={s.bag} /></div>
      <div className="section feet"><Section items={s.feet} /></div>
    </div>
     </div>
    )
}