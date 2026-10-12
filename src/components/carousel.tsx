import { useState } from "react";
import type { ClosetItem } from "../types/ClosetItem";

import './carousel.css'

// items: given a list of ClosetItems
// shows one at a time, keeping track of which item is shown from items
export function Carousel({ items }: { items: ClosetItem[] }) { 
  const [index, setIndex] = useState(0);
  console.log(items)

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="carousel">
      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="carousel-btn">‹</button>  
      <div className="carousel-item">
        <img src={items[index].image_url} alt={items[index].description}/>   
      </div>  
      <button onClick={(e) => { e.stopPropagation(); next(); }} className="carousel-btn">›</button>
    </div>
  );
}