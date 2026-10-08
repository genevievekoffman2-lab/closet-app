/** Weather logic here */
import type { Weather } from "../types/weather";


/** TODO Get Users Current Location */

type Location = {
    name: string; 
    latitude: number;
    longitude: number;
};

/* const nyc: Location = {
    name: "New York City",
    latitude: 40.7851,
    longitude: -73.9683
}; */

const white_horse_CA: Location = {
    name: "White Horse, Canada",
    latitude: 60.7212,
    longitude: -135.0568
}; 

//costa rica -- HOT

/** Get Temperature based on location */
export async function getWeather(
    latitude: number = white_horse_CA.latitude,
    longitude: number = white_horse_CA.longitude
): Promise<Weather> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&hourly=precipitation_probability&temperature_unit=fahrenheit&wind_speed_unit=mph`
    const response = await fetch(url);
    const data = await response.json(); 

    /* precipitation is given as an array of values (1 per hr for the next 7 days) 
        hourly[time] and hourly[precipitation_probability]
        we have to grab the index in hourly[time] matching the current hr */
    const currentHourIndex = data.hourly.time.findIndex(
        (t: string) => t === data.current.time.slice(0, 13) + ":00"
    );
    const chanceOfRain = data.hourly.precipitation_probability[currentHourIndex] ?? 0;

    let currentWeather: Weather = {
        location: white_horse_CA.name,  
        temperature: data.current.temperature_2m,
        precipitation: chanceOfRain,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m
    };
    
    return currentWeather;
}