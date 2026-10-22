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
- Tights (`bottom:0` + `feet:1`) and socks (`feet:1`) both use `feet:1` on purpose, so they can't be worn together.
- Dresses: one that can be worn over a top occupies `top:2` + `bottom:1`; one that can't occupies `top:1` + `bottom:1`.
- `tags` use `key:value` format (e.g. `color:navy`, `pattern:striped`).
  - Tag keys in use: `color`, `pattern`, `material`, `brand`, `weather`, `length`.
  - `color:` / `pattern:` values should match `Color` / `Pattern` in `closetItemTags.ts`. Accessory matching compares exact strings.
  - `Color` / `Pattern` are derived from the `COLORS` / `PATTERNS` const arrays there. Add new values to the arrays; UI lists (Add item swatches/chips) read from them.
  
## Database (Supabase)
- Closet data lives in Supabase. Schema is in `supabase/migrations/`.
- Tables:
  - `items`: id (uuid), type, description, image_url, warmth (real), waterproof,
    occupies (text[]), requires (text[]), category (accessories only, required for them),
    kind (text, the `ITEM_KINDS` id; nullable, added in `20261022105537_add_kind_to_items.sql`)
  - `tags`: id, key, value; unique (key, value). Stored lowercase.
  - `item_tags`: join table (item_id, tag_id), cascade delete on both.
- Item images are in the public Storage bucket `item-images`.
- Schema changes go in a NEW migration file (`supabase migration new <name>`).
  Never edit an existing migration and never change the schema in the dashboard.
- Row Level Security: public read on all tables. Writes (insert/update/delete on
  `items`, `tags`; insert/delete on `item_tags`; upload/select/delete in `item-images`) are
  owner-only: `auth.uid()` must equal the one user's id, hardcoded in
  `20261017202310_add_owner_policies.sql` (storage select in `20261022112124_storage_owner_select.sql`;
  `remove()` needs select + delete).
- Auth: Supabase Auth, email + password. Sign-ups are disabled; the one user was
  created in the dashboard. Login page is `src/pages/Login.tsx`; `App` holds the
  session (`getSession` + `onAuthStateChange`) and shows the signed-in email +
  Sign out in a small corner bar. supabase-js keeps the session in localStorage.
  Signed-out visitors can still browse everything.
- The service role key is only for scripts (`scripts/`), loaded from `.env.local`.
  Never use it in frontend code.
- In the app, tags are still `"key:value"` strings. Convert to and from rows
  at the database boundary.

## Current state
- The app loads the closet from Supabase: `fetchCloset` in `src/lib/supabase.ts`, called once in `App` and passed down as a `closet` prop (`buildOutfit2` and `fetchOptions` take it as a parameter).
- `supabase.ts` exports the one `supabase` client; the app uses it for both reads and `supabase.auth`. Don't create a second client.
- Login works (see Database → Auth). The only in-app write is Add item → `createItem` in `src/api/items.ts`: uploads the photo to `item-images`, inserts the `items` row, upserts each tag and links it in `item_tags`. On failure it deletes the item (links cascade), then the image, and rethrows. Not atomic (no RPC); cleanup failures are only logged. Newly created tags aren't rolled back.
- Frontend env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (in `.env.local` and Vercel).
- `src/data/closetItems.ts` is no longer used by the app; kept until the Supabase switch is confirmed, then it will be removed.
- `scripts/migrate-closet.ts` was a one-time migration of that file into Supabase.

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
- Pages (`Page` in `App.tsx`): `home`, `closet`, `result`, `login`, `add`. Navigation is `setPage`, no router.
- Auth bar (`.auth_bar` in `App.css`): fixed top-right on home, closet and result (not on login or the loading/error screens). Signed in: email + Sign out (`supabase.auth.signOut()`). Signed out: Log in → login page.
- Login page (`Login.tsx`): email + password via `signInWithPassword`; success → Home, failure shows the error; Back button; no sign-up link. It renders before the closet loading check, so login works even if the closet fails to load.
- Add item page (`AddItem.tsx`): reached from a round "+" button (`.add_btn` in `Closet.css`) fixed to the bottom-right of the Closet page, above everything (z-index 1000), signed in only. Page itself also gated (`page == "add" && session`). A round ✕ button (same `.add_btn` style, bottom-right) cancels back to Closet. Submit: `collect_form_data` builds a `ClosetItem`, then `createItem(item, kind.id, processedPhoto)` saves it; on success `onSaved` adds it to `closet` in `App` and goes to Closet. The button is disabled with no kind/photo, while saving, or while the background is being removed. A photo is required. Picking a photo runs `removeBackground` (`src/lib/image_helpers/processImage.ts`, `@imgly/background-removal`) in the browser; `processedPhoto` is what gets uploaded.
  - Fields in order: photo (camera / library + preview), kind, description, colors (name shows on hover via CSS `::after`), pattern, details (warmth steps, waterproof, "Only wear in rain" → `weather:rain`, materials, brand with autocomplete from existing `brand:` tags), Advanced (raw occupies/requires, primary kinds only).
  - Kinds come from `ITEM_KINDS` in `src/data/itemKinds.ts`: each sets type, occupies, requires, category, default warmth, and `keywords`. The last description word that's a keyword preselects the kind ("Sweater Vest" → vest) until the user picks one.
  - Dress kind shows "Can you wear a top underneath?" (default no), which switches `top:1` ↔ `top:2`.
  - Warmth steps: None 0, Light 0.2, Medium 0.4, Warm 0.6, Very warm 1.
  - Tags come out lowercase `key:value`.
- Home: clicking the location icon shows a row of buttons for `LOCATIONS` (`weather.ts`: New York City, White Horse). Picking one reloads the weather via `getWeather(location)`; the shown name comes from the returned `Weather`.
- `OutfitResult.tsx` → `groupOutfit`: flex row. Left: outerwear, bag, other accessories. Middle: 2-col grid of top/bottom (one merged section for dresses). Right: feet.
- Clicking an item opens a `Carousel` of options from `fetchOptions` (`outfitUtils.ts`): primary = identical `occupies`, accessory = same category, outerwear = any. The carousel index lives in `Section`.
- ✓ swaps via `setOutfit` (passed from `App`), replacing by object reference, not id. ✕ closes.
- A flat-lay collage redesign (CSS grid with named areas) was tried and reverted; the flex-row layout above is current.
- Swaps are user control: they ignore warmth on purpose.
- Closet page: filter buttons (All/Tops/Bottoms/Dresses/Shoes/Outerwear/Accessories). Category comes from `type` + zones via `getCategory`; tights → Bottoms, socks → Shoes. No category field on items.
- Item images have backgrounds removed: older ones with `rembg`, new ones in the Add item form with `@imgly/background-removal`.

## Known gaps / next up
- Carousel options aren't validated yet: filter to swaps that keep zones covered, no slot conflicts, `requires` met (ignore warmth). Plan: same zones as the clicked item, then validity check.
- Carousel doesn't apply Rain rules.
- Umbrella when raining; `weather:sunshine` (sunglasses) isn't read yet.
- Tag gaps: plaid/polka-dot and red/blue outfits often get no accessory.
- Add item: no `waist` kind yet; sunglasses kind doesn't add `weather:sunshine`.
- Open: should rain always add the raincoat, even above 60°F?
- No edit/delete items in the app yet. When added, gate the UI on `session` in `App`; RLS already enforces owner-only.
- Planned: remove/lock buttons, laying out accessories separately.
