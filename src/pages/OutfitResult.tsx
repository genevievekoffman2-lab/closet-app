import './OutfitResult.css' 
import type { ClosetItem } from '../types/ClosetItem2';


type props = { 
    outfit: ClosetItem[] | null;
    setPage: (page: "home" | "closet" | "result") => void;
};
 
export default function OutfitResult({outfit, setPage}: props) { 
    const items = outfit ?? [];
    const topCount = Math.floor(items.length / 2);
    const topRow = items.slice(0, topCount);
    const bottomRow = items.slice(topCount);


    return ( 
        <div className="outer_container">  
            <a href="#" className="home_btn" onClick={(e) => {
                    e.preventDefault();
                    setPage("home")
                }}> home </a> 
            <div className="outfit">
            <div className="outfit-row">
            {topRow.map((item) => (
                <div key={item.id} className="outfit-item">
                <img src={item.image_url} alt={item.description} /> 
                </div>
            ))}
            </div>
            <div className="outfit-row">
            {bottomRow.map((item) => (
                <div key={item.id} className="outfit-item">
                <img src={item.image_url} alt={item.description} /> 
                </div>
            ))}
            </div>
        </div>
            </div> 
    )
}