import type { ClosetItem } from "../types/ClosetItem";

import './carousel.css'

// items: given a list of ClosetItems
// shows one at a time; the parent keeps track of which item is shown (index)
export function Carousel({ items, index, setIndex }: { items: ClosetItem[]; index: number; setIndex: (i: number) => void }) {
  console.log(items)

  const prev = () => setIndex((index - 1 + items.length) % items.length);
  const next = () => setIndex((index + 1) % items.length);

  return (
    <div className="carousel">
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="carousel-btn">‹</button>
      <div className="carousel-item" onClick={(e) => e.stopPropagation()}>
        <img src={items[index].image_url} alt={items[index].description}/>   
      </div>  
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="carousel-btn">›</button>
    </div>
  );
}