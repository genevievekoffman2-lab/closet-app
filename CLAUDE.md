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
  - `requires`: slots that must be filled by *other* items. One-directional: only the item that lists it needs it (e.g. tights require `bottom:1`, vests require `top:1`, socks require `feet:2`).
- Pants occupy both `bottom:0` and `bottom:1` so they can't be worn with a skirt.
- All shoes use `feet:2` so only one pair can be chosen.
- `tags` use `key:value` format (e.g. `color:navy`, `pattern:striped`).
  - Tag keys in use: `color`, `pattern`, `material`, `brand`, `weather`, `length`.
  - `color:` / `pattern:` values should match `Color` / `Pattern` in `closetItemTags.ts`. Accessory matching compares exact strings.

## Warmth
- `min_warmth` / `max_warmth` are **warmth values**, not degrees. Don't convert them.
- `getWarmthRanges` maps °F + humidity + wind to a per-zone window; `buildOutfit2` doubles it (top + bottom).
- Feet don't count toward warmth.

## Rain
- Raining = `precipitation > 50` (chance of rain %, current hour).
- `waterproof: boolean` (on BaseItem) means the item can be worn in rain. It does NOT mean rain-only.
- Tag `weather:rain` means the item is ONLY worn when it's raining (e.g. rainboots, raincoat).
- Raining: shoes (items occupying `feet:2`) and outerwear must be `waterproof: true`.
- Not raining: exclude anything tagged `weather:rain`.
- Enforced in `buildOutfit.ts` (`rainOk`) by filtering items before the search. `search.ts` doesn't know about rain.

## Outfit rules (an outfit is valid when)
1. Every zone (top, bottom, feet) is covered.
2. Total warmth is within the window.
3. Every `requires` slot is filled by another chosen item.
4. Shoes (`feet:2`) are always required.
5. No slot is filled twice.
6. Rain rules are met.

## Search
- `findOutfits`: simple include/exclude recursion over primary items with a short validity check. Keep it this simple.
- Outerwear: only below 60°F, and only if the base outfit's warmth is below the top of the window. Pick the allowed coat (per Rain rules) whose warmth is closest to that gap (via `reduce`).

## Accessories
- Every outfit gets a random bag, then one extra non-bag accessory chosen last (`selectAccessory` in `buildOutfit.ts`).
- Looks at all tagged items in the outfit (top, bottom, shoes, coat, bag). Items without tags are ignored. `pattern:solid` counts as no pattern.
- Neutrals: black, white, cream, ivory, gray, navy, beige, tan, brown.
- Rules, in order (first that applies wins):
  1. Outfit has a pattern → accessory with the same pattern.
  2. All colors neutral → accessory with a pattern or a non-neutral color.
  3. Otherwise → accessory sharing any color with the outfit.
- No match → add nothing (don't fall back to random). Multiple matches → `pickRandom`.
- Umbrella (`weather:rain`) is excluded for now.

## UI
- `OutfitResult.tsx` → `groupOutfit`: flex row. Left: outerwear, bag, other accessories. Middle: 2-col grid of top/bottom (one merged section for dresses). Right: feet.
- Clicking an item opens a `Carousel` of options from `fetchOptions` (`outfitUtils.ts`): primary = identical `occupies`, accessory = same category, outerwear = any. The carousel index lives in `Section`.
- ✓ swaps via `setOutfit` (passed from `App`), replacing by object reference, not id. ✕ closes.
- Swaps are user control: they ignore warmth on purpose.
- Closet page: filter buttons (All/Tops/Bottoms/Dresses/Shoes/Outerwear/Accessories). Category comes from `type` + zones via `getCategory`; tights → Bottoms, socks → Shoes. No category field on items.
- Item images have backgrounds removed with `rembg`.

## Known gaps / next up
- Carousel options aren't validated yet: filter to swaps that keep zones covered, no slot conflicts, `requires` met (ignore warmth). Plan: same zones as the clicked item, then validity check.
- Carousel doesn't apply Rain rules.
- Umbrella when raining; `weather:sunshine` (sunglasses) isn't read yet.
- Tag gaps: plaid/polka-dot and red/blue outfits often get no accessory; Pearl Earrings and Plaid Mini Skirt are untagged; Leopard Hat's `pattern:leopard` doesn't match the `Pattern` type (`"animal print"`).
- Open: should rain always add the raincoat, even above 60°F?
- Planned: remove/lock buttons, laying out accessories separately.
