import { mockCloset } from "../data/closetItems"
import './Closet.css'

export default function Closet() {
    return (
        <div>
            <p className="title"> My Closet </p>
             <div className="closet_grid">
                {mockCloset.map((closet_item) => (
                    <div className="closet_box" onClick={() => console.log(closet_item.description)}> 
                        <img className="img_item" src={closet_item.image_url} alt={closet_item.description} />
                    </div>
                ))}
                
                <div></div>
                <div></div>
            </div>
        </div>

       
    )


}