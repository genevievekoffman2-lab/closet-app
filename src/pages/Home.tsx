import './Home.css'

export default function Home() {

    function generateOutfit() {
        alert('generate btn clicked')
    }

    return (
        <div> 
            <div className="container">

                <div className="location_box"> 
                    <img className="location_icon" src="/location_icon.png" alt="location icon"/>
                    <div className="location_text"> New York City </div>
                </div>

                <div className="weather_box">
                    <img className="temp_img" src='/sunshine_icon.png' alt="🌤️"/>
                    <div className="temperature">42°F</div>
                    <div className="weather_details">
                        <p> Precipitation: 0% <br/> Humidity: 33% <br/>  Wind: 8mph</p>  
                    </div>
                </div>

                <div className="btn_box">
                    <button className="generate_outfit_btn" onClick={generateOutfit}> 
                        Generate Outfit
                    </button>
                    <p className="closet_link"> my closet </p>
                </div>
                
            </div>
            
        </div>
    );
} 