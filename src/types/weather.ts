
export interface Weather {
    location: string;
    temperature: number; //Farenheit
    precipitation: number; // %
    humidity: number; // %
    wind: number; // %
}

let mockLocation: Weather = {
    location: "New York City",
    temperature: 42,
    precipitation: 0,
    humidity: 33,
    wind: 8
};