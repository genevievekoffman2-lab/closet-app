import './Home.css'
import { getWeather } from '../lib/weather';
import { useState, useEffect } from 'react';
import type { Weather } from '../types/weather';

//TODO: update temp_img based on weather conditions
type props = {
    setPage: (page: "home" | "closet" | "result") => void;
};

export default function Home({setPage} : props) {

    const [weather, setWeather] = useState<Weather | null>(null);

    function generateOutfit() { 
        console.log("TODO")
        //call logic to compute outfit
        setPage("result");
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
                    <img className="temp_img" src='/sunshine_icon.png' alt="🌤️"/> 
                    <div className="temperature">{weather ? weather.temperature : "err"}°F</div>
                    <div className="weather_details">
                        <p> Precipitation: {weather ? weather.precipitation : "err"}% 
                            <br/> Humidity: {weather ? weather.humidity : "err"}% 
                            <br/>  Wind: {weather ? weather.wind : "err"}mph</p>  
                    </div>
                </div>

                <div className="btn_box">
                    <button className="generate_outfit_btn" onClick={generateOutfit}> 
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