/** Weather logic here */
import type { Weather } from "../types/weather";


/** TODO Get Users Current Location */

// Default coordinates for testing — New York City
const DEFAULT_LATITUDE = 40.7128;
const DEFAULT_LONGITUDE = -74.006;

/** Get Temperature based on location */
export async function getWeather(
    latitude: number = DEFAULT_LATITUDE,
    longitude: number = DEFAULT_LONGITUDE
): Promise<Weather> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph`;

    const response = await fetch(url);
    const data = await response.json(); 

    let currentWeather: Weather = {
        location: "New York City", //TODO: hardcoded until grabbing users loc is setup
        temperature: data.current.temperature_2m,
        precipitation: data.current.precipitation,
        humidity: data.current.relative_humidity_2m,
        wind: data.current.wind_speed_10m
    };
    
    return currentWeather;
}