import './Home.css'
import { getWeather } from '../lib/weather';
import { useState, useEffect } from 'react';
import type { Weather } from '../types/weather';  
import { buildOutfit2 } from '../lib/buildOutfit';
import type { ClosetItem } from '../types/ClosetItem';

type props = {
    setPage: (page: "home" | "closet" | "result") => void;
    setOutfit: (outfit: ClosetItem[] | null) => void;
};

export default function Home({setPage, setOutfit} : props) {

    const [weather, setWeather] = useState<Weather | null>(null);

    function generateOutfitV2() {
        //V2
        if (weather != null) {
            const outfitResult = buildOutfit2(weather.temperature, weather.precipitation, weather.humidity, weather.wind); 
            if (outfitResult == null) { // missing an item 
                alert('outfit item missing')
                return;
            }
            console.log(outfitResult)
            setOutfit(outfitResult);
            setPage("result");
        }
    } 

    async function loadWeather() {
        const weather = await getWeather();
        console.log(weather);
        setWeather(weather);
    }

    useEffect(() => {
        loadWeather();
    }, []);

    return (
        <div> 
            <div className="container">

                <div className="location_box"> 
                    <img className="location_icon" src="/location_icon.png" alt="location icon"/>
                    <div className="location_text"> New York City </div>
                </div>

                <div className="weather_box">
                <img className="temp_img"
                    src={weather && weather.precipitation > 50 ? "/rain_icon.png" : "/sunshine_icon.png"}
                    alt={weather && weather.precipitation > 50 ? "Rainy" : "Sunny"} />  
                    <div className="temperature">{weather ? weather.temperature : "err"}°F</div>
                    <div className="weather_details">
                        <p> Precipitation: {weather ? weather.precipitation : "err"}% 
                            <br/> Humidity: {weather ? weather.humidity : "err"}% 
                            <br/>  Wind: {weather ? weather.wind : "err"}mph</p>  
                    </div>
                </div>

                <div className="btn_box">
                    <button className="generate_outfit_btn" onClick={generateOutfitV2}> 
                        Generate Outfit
                    </button> 
                    <a href="#" className="closet_link" onClick={(e) => {
                        e.preventDefault();
                        setPage("closet");
                    }}> my closet </a>
                </div>
                
            </div>
            
        </div>
    );
} 