import './OutfitResult.css'
import type { Outfit } from "../types/outfit";
import type { closetItem } from "../types/closetItem";

type props = {
    setPage: (page: "home" | "closet" | "result") => void;
};

let mockItem: closetItem = {
    id: "23FEX", 
    description: "Black Flats",
    type: "shoes",
    warmth: "light",
    waterproof: false,
    image_url: '/closetItems/ballet_flats.png'
}


export default function OutfitResult({setPage}: props) {
    const outfitResult: Outfit = {
        top: mockItem,
        bottom: mockItem,
        shoes: mockItem,
        accessory: mockItem
    }

    return ( 
        <div className="outer_container">  
            <a href="#" className="home_btn" onClick={(e) => {
                    e.preventDefault();
                    setPage("home")
                }}> home </a> 
            <div className="outfit_container">
                <div className="row top_row">

                    <div className="img_item"> 
                        <img src="public/closetItems/navy_wool_coat.png"></img>
                    </div>
                    <div className="img_item"> 
                        <img src="public/closetItems/white_knit_pullover.png"></img>
                    </div>
                    <div className="img_item"> 
                        <img src="public/closetItems/pearl_earrings.png"></img>
                    </div>

                </div>
                <div className="row bottom_row">
                    <div className="img_item"> 
                        <img src="public/closetItems/ballet_flats.png"></img>
                    </div>
                    <div className="img_item"> 
                        <img src="public/closetItems/plaid_skirt.png"></img>
                    </div>
                    <div className="img_item"> 
                        <img src="public/closetItems/coach_black_bag.png"></img>
                    </div>
                    
                </div>


                {/* <div className="accessory_container"> 
                    <img src="public/closetItems/pearl_earrings.png" className='img_item'></img>
                </div>
                <div className="top_container"> 
                    <img src="public/closetItems/white_light_blouse.png" className='img_item'></img>
                </div>
                <div className="bottom_container"> 
                    <img src="public/closetItems/plaid_skirt.png" className='img_item'></img>
                </div>
                <div className="shoes_container"> 
                    <img src={outfitResult.shoes.image_url} className='img_item'></img>
                </div>  */}
            </div>
        </div>
    )
}