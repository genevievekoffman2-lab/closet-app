# Closet app

Outfit picker: given the weather (temperature, precipitation, humidity, wind), choose a valid outfit from closet items. TypeScript + React, deployed on Vercel (pushes to main auto-deploy).

## How I want you to work
- Keep code minimal and direct. Don't add abstractions, config layers, or helpers I didn't ask for.
- Prefer the simplest version that works; I'll ask for more if I need it.
- Ask before changing the data model (`ClosetItem`, slots, tags).
- Show me what you changed and why, briefly.
- If the code differs from this file, the code is the source of truth. Tell me about the mismatch before changing anything, and offer to update this file.

## Data model
- `ClosetItem` types: `primary`, `outerwear`, `accessory`.
- Slots are `"zone:depth"` strings, e.g. `top:1`, `bottom:0`, `feet:2`.
  - `occupies`: slots this item fills.
  - `requires`: slots that must be filled by *other* items. Requirements go both ways (e.g. tights need a skirt and a vest needs something underneath where specified).
- Pants occupy both `bottom:0` and `bottom:1` so they can't be worn with a skirt.
- All shoes use `feet:2` so only one pair can be chosen
- `tags` use `key:value` format (e.g. `color:navy`, `season:summer`). we will implement this together further.

## Warmth
- `min_temp` / `max_temp` are **warmth values**, not degrees. Don't convert them.
- Feet don't count toward warmth.

## Rain
- Raining = `precipitation > 50` (chance of rain %, current hour).
- `waterproof: boolean` (on BaseItem) means the item can be worn in rain. It does NOT mean rain-only.
- Tag `weather:rain` means the item is ONLY worn when it's raining (e.g. rainboots, raincoat).
- Raining: shoes and outerwear must be `waterproof: true`.
- Not raining: exclude anything tagged `weather:rain`.

## Outfit rules (an outfit is valid when)
1. Every zone (top, bottom, feet) is covered.
2. Total warmth is within the window.
3. Every `requires` slot is filled by another chosen item.

## Search
- `findOutfits`: simple include/exclude recursion over primary items with a short validity check. Keep it this simple.
- Outerwear: pick the non-waterproof coat whose warmth is closest to the gap between the base outfit and the target (via `reduce`).

## UI
- `outfitLayout.ts` (`groupOutfit`, `getDepth`): CSS grid with outerwear on the left, top/bottom in the middle (one merged cell for dresses), bag/feet on the right. Layers stack by depth.
- `OutfitResult.tsx`: clicking an item opens a `Carousel` of interchangeable items (same zones and depth, matched by `kindKey`); swapping updates state via `setOutfitV2`.
- Item images have backgrounds removed with `rembg`.

## Known gaps / next up
- Swaps in the carousel aren't validated yet: they can create slot conflicts or unmet `requires`. Only show options that keep the outfit valid.
- Planned: click-to-select items with highlight, remove/accept/lock buttons, laying out accessories separately.