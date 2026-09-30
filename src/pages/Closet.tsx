import { useState } from "react"
import { mockCloset } from "../data/closetItems"
import './Closet.css'
import type { closetItem } from "../types/closetItem";

type props = {
    setPage: (page: "home" | "closet" | "result") => void;
};

export default function Closet({setPage} : props) {
    const [selectedItem, setSelectedItem] = useState<closetItem | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);


    //flattens tags so I can add to css
    const tagList = [
    ...(selectedItem?.tags?.colors ?? []),
    selectedItem?.tags?.pattern,
    ].filter(Boolean);

    return (
        <div> 
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a> 
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
                                <p className="item_info">
                                    <br /> {selectedItem?.type} <br />
                                    warmth: {selectedItem?.warmth.join(", ")} <br /> 
                                    {tagList.map((tag) => (<span key={tag} className="tag_chip">#{tag} </span>))}
                                    </p>
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
    )


}