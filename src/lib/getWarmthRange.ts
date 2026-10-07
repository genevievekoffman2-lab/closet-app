/** Logic to compute warmth range in a zone (min_warmth and max_warmth)
 * based on temperature, humidity and wind
 * precipitation is considered elsewhere
 */


//takes temperature in degF, humidity as percent, and wind in mph 
// returns [min_warmth, max_warmth] (window)
export function getWarmthRanges(temp: number, humidity: number, wind: number) { 
    let target_warmth: number;
    
    if (temp < 30) {
        target_warmth = 0.9; // freezing — need heavy warmth
    } else if (temp < 50) {
        target_warmth = 0.7; // cold
    } else if (temp < 65) {
        target_warmth = 0.6; // cool
    } else if (temp < 80) {
    target_warmth = 0.25; // mild/warm
    } else {
        target_warmth = 0.05; // hot — barely any warmth needed
    }

    // if there is humidity -> shrink target a bit; it feels warmer than it is
    if (humidity > 55) {
        target_warmth = target_warmth * 0.85;
    }
    // if wind -> increase target; it feels colder
    if (wind > 35) {
        target_warmth = target_warmth * 1.1;
    }  

    let min_warmth = target_warmth - 0.1;
    let max_warmth = target_warmth + 0.1;

    return [min_warmth, max_warmth];
}
 
