import './OutfitResult.css'
import type { Outfit } from "../types/outfit"; 


type props = {
    outfit: Outfit;
    setPage: (page: "home" | "closet" | "result") => void;
};
 
export default function OutfitResult({outfit, setPage}: props) { 
    return ( 
        <div className="outer_container">  
            <a href="#" className="home_btn" onClick={(e) => {
                    e.preventDefault();
                    setPage("home")
                }}> home </a> 
            <div className="outfit_container">
                <div className="row top_row">

                    <div className="img_item"> 
                        <img src={outfit.accessory.image_url}></img>
                    </div>
                    <div className="img_item"> 
                        <img src={outfit.top.image_url}></img>
                    </div>
                    <div className="img_item"> 
                        <img src={outfit.outerwear?.image_url}></img>
                    </div>

                </div>
                <div className="row bottom_row">
                    <div className="img_item"> 
                        <img src={outfit.shoes.image_url}></img>
                    </div>
                    <div className="img_item"> 
                        <img src={outfit.bottom.image_url}></img>
                    </div>
                    <div className="img_item"> 
                        <img src="public/closetItems/coach_black_bag.png"></img>
                    </div>
                    
                </div> 
            </div>
        </div>
    )
}