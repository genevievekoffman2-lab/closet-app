import './OutfitResult.css'
import type { ClosetItem } from '../types/ClosetItem.ts';
import { useState } from 'react';
import { Carousel } from "../components/carousel.tsx";
import { fetchOptions } from '../lib/outfitUtils.ts';
import { PLACEMENTS, type Role } from './outfitPlacements.ts';

type props = {
    closet: ClosetItem[];
    outfit: ClosetItem[] | null;
    setOutfit: (outfit: ClosetItem[] | null) => void;
    setPage: (page: "home" | "closet" | "result") => void;
};

const isDress = (item: ClosetItem) =>
  item.type === "primary" &&
  item.occupies.some((slot) => slot.startsWith("top:")) &&
  item.occupies.some((slot) => slot.startsWith("bottom:"));

const isTights = (item: ClosetItem) =>
  item.type === "primary" && item.occupies.includes("feet:1") && item.occupies.includes("bottom:0");

// which spot in the collage this item goes in
function getRole(item: ClosetItem, outfit: ClosetItem[]): Role {
  if (item.type === "outerwear") return "outerwear";
  if (item.type === "accessory") return item.category; // "bag" or another accessory category

  if (isDress(item)) return "dress";
  if (isTights(item)) return "tights";
  if (item.occupies.includes("feet:2")) return "shoes";
  if (item.occupies.includes("feet:1")) return "socks";

  if (item.occupies.some((slot) => slot.startsWith("top:"))) {
    if (outfit.some(isDress)) return "layeredTop"; // top worn under a dress goes to the side
    if (item.occupies.includes("top:1")) return "baseTop";
    // a top:2 item is the layer only if something else fills top:1
    const hasBase = outfit.some((i) => i !== item && i.type === "primary" && i.occupies.includes("top:1"));
    return hasBase ? "layeredTop" : "baseTop";
  }
  return "bottom";
}

// pixels of each image, read once from a hidden canvas (null = couldn't read)
const pixelCache = new Map<string, ImageData | null>();

// is the image's pixel under the cursor visible? (transparent PNG areas shouldn't catch clicks)
function isOpaqueAt(img: HTMLImageElement, clientX: number, clientY: number): boolean {
  if (!img.naturalWidth) return true; // not loaded yet

  if (!pixelCache.has(img.src)) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      pixelCache.set(img.src, ctx.getImageData(0, 0, canvas.width, canvas.height));
    } catch {
      pixelCache.set(img.src, null); // e.g. CORS blocked the read
    }
  }
  const data = pixelCache.get(img.src);
  if (!data) return true; // can't tell, so act like before (whole box clickable)

  const rect = img.getBoundingClientRect();
  const x = Math.floor((clientX - rect.left) / rect.width * data.width);
  const y = Math.floor((clientY - rect.top) / rect.height * data.height);
  const alpha = data.data[(y * data.width + x) * 4 + 3];
  return alpha > 10; // rembg leaves faint haze around edges; don't count it
}

export default function OutfitResult({closet, outfit, setOutfit, setPage}: props) {
    const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
    const [itemOptions, setItemOptions] = useState<ClosetItem[] | null>(null);
    const [index, setIndex] = useState(0); // which option the carousel is showing

    if (!outfit) return <p>No outfit found for this weather.</p>;

    const hasCoat = outfit.some((i) => i.type === "outerwear");
    const hasDress = outfit.some(isDress);
    const hasTights = outfit.some(isTights);
    const template = `${hasCoat ? "coat_" : ""}${hasDress ? "dress" : "separates"}${hasTights ? "_tights" : ""}` as keyof typeof PLACEMENTS;
    const placements = PLACEMENTS[template];
    console.log("collage template:", template); // debug

    const handleImageClick = async (item: ClosetItem) => {
      setSelectedItem(item);
      setItemOptions(null);      // clear options from a previous item
      setIndex(0);               // start on the selected item itself

      try {
        setItemOptions(await fetchOptions(item, closet));
      } catch (err) {
        console.error("Failed to fetch options", err);
      }
    };

    // elementsFromPoint is front-to-back; pick the frontmost item that's visible at the click
    const handleCollageClick = (e: React.MouseEvent) => {
      const hit = document.elementsFromPoint(e.clientX, e.clientY).find((el) =>
        el instanceof HTMLImageElement && el.dataset.i !== undefined && isOpaqueAt(el, e.clientX, e.clientY)
      ) as HTMLImageElement | undefined;
      if (hit) handleImageClick(outfit[Number(hit.dataset.i)]);
    };

    const close = () => setSelectedItem(null);

    // replace the exact object (not by id) so duplicate ids can't swap the wrong item
    const swap = (oldItem: ClosetItem, newItem: ClosetItem) =>
        setOutfit(outfit.map((i) => (i === oldItem ? newItem : i)));

    return (
        <div>
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a>

            <div className="collage" onClick={handleCollageClick}>
              {outfit.map((item, i) => {
                const p = placements[getRole(item, outfit)];
                if (!p) return null;
                return (
                  <img
                    key={`${item.id}-${i}`}
                    src={item.image_url}
                    alt={item.description}
                    crossOrigin="anonymous" // lets the canvas read pixels for hit-testing
                    data-i={i}
                    style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.width}%`, zIndex: p.z }}
                  />
                );
              })}
            </div>

            {selectedItem && (
              // clicking the backdrop closes; the carousel stops its own clicks from bubbling
              <div className="swap-overlay" onClick={close}>
                {itemOptions ? (
                  <div className="swap-box">
                    <button className="card-action">✕</button>
                    <Carousel items={itemOptions} index={index} setIndex={setIndex}/>
                    <button className="card-action" onClick={() => swap(selectedItem, itemOptions[index])}>✓</button>
                  </div>
                ) : (
                  <p>Loading…</p>
                )}
              </div>
            )}
        </div>
    )
}
