import { useState } from "react"
import { mockCloset } from "../data/closetItems"
import './Closet.css'
import type { closetItem } from "../types/closetItem";

export default function Closet() {
    const [selectedItem, setSelectedItem] = useState<closetItem | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    return (
        <div>
            <p className="title"> My Closet </p>
            <div className="closet_grid">
                {mockCloset.map((closet_item) => (
                    <div className="closet_box" onClick={() => {
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
                                <p className="item_info"> <br/> {selectedItem?.type} <br/> warmth: {selectedItem?.warmth} <br/> ...more info </p>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
    )


}