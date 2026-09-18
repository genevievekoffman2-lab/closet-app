Problem Statement: 
- Deciding what to wear every morning is a small but real source of stress and looking good tends to set a confident tone for the day. This app removes that decision by pulling today’s weather and matching it against a curated closet of items to suggest one complete outfit.
- For MVP, the closet has a preset of ~20 items (future versions will have feature of adding more items) 

MVP scope (V1)
-	Closet page: displays the preset wardrobe items (grid view)
-	Generate page: a button that triggers the outfit algorithm and displays the result
-	Logic: pulls current weather condition based on user’s location, selects one top, one bottom, one pair of shoes and one accessory from the closet, filtered/weighted by weather conditions
o	If weather is cold enough or rain, add 1 outerwear item
o	If no valid item exists for a required slot given conditions, show a fallback alert message for incomplete outfit
-	Display’s outfit with images on Generate Page

Tech stack: 
-	React + TypeScript + Vite
-	Weather: Open-Meteo (doesn’t require API key, good for quick project)