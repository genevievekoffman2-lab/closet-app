import { useState } from "react" 
import './Closet.css'
import type { ClosetItem } from "../types/ClosetItem.ts"
import { closet } from "../data/closetItems";

//TODO add filtering

type props = {
    setPage: (page: "home" | "closet" | "result") => void;
};

export default function Closet({setPage} : props) {
    const [selectedItem, setSelectedItem] = useState<ClosetItem | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);


    return (
        <div> 
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a> 
            <p className="title"> My Closet </p>
            <div className="closet_grid">
                {closet.map((closet_item) => (
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