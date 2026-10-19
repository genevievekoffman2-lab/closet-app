import { useState } from "react" 
import './Closet.css'
import type { ClosetItem } from "../types/ClosetItem.ts"

type props = {
    closet: ClosetItem[];
    setPage: (page: "home" | "closet" | "result" | "add") => void;
    signedIn: boolean;
};

const FILTERS = ["All", "Tops", "Bottoms", "Dresses", "Shoes", "Outerwear", "Accessories"];

// category from type + zones
function getCategory(item: ClosetItem): string {
    if (item.type === "outerwear") return "Outerwear";
    if (item.type === "accessory") return "Accessories";
    const top = item.occupies.some((s) => s.startsWith("top:"));
    const bottom = item.occupies.some((s) => s.startsWith("bottom:"));
    if (top && bottom) return "Dresses";
    if (top) return "Tops";
    if (bottom) return "Bottoms";
    return "Shoes";
}

export default function Closet({closet, setPage, signedIn} : props) {
    const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [filter, setFilter] = useState("All");


    return (
        <div> 
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a> 
            <p className="title"> My Closet </p>
            <div className="filter_row">
                {FILTERS.map((f) => (
                    <button key={f} className={f === filter ? "filter_btn active" : "filter_btn"} onClick={() => setFilter(f)}>
                        {f}
                    </button>
                ))}
                {signedIn && <button className="filter_btn" onClick={() => setPage("add")}>+ Add item</button>}
            </div>
            <div className="closet_grid">
                {closet.filter((item) => filter === "All" || getCategory(item) === filter).map((closet_item) => (
                    <div key={closet_item.id} className="closet_box" onClick={() => {
                        setShowOverlay(true);
                        setSelectedItem(closet_item)
                        }}> 
                        <img className="img_item" src={closet_item.image_url} alt={closet_item.description} />
                    </div>
                ))}
            </div>
            { /* overlay only appears once item is selected */}
            {
                showOverlay && (
                    <div className="overlay_container" onClick={()=>setShowOverlay(false)}>
                        <div className="white_background"> 
                            <div className="flex_item">
                                <img className="selected_item_img" src={selectedItem?.image_url}/> 
                            </div>
                            <div className="flex_item">
                                <p className="img_title"> {selectedItem?.description} </p> 
                                <p className="item_info"> 
                                    {selectedItem?.tags?.map((tag) => {
                                        const [name,value] = tag.split(":");
                                        console.log(name);
                                        return (<span className="tag_chip" key={tag}> #{value}</span>);
                                    }) }
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
    )


}