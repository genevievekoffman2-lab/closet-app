import { useState } from "react"
import './Closet.css'
import './AddItem.css'
import type { ClosetItem, Slot } from "../types/ClosetItem.ts"
import { COLORS, PATTERNS, type Color, type Pattern } from "../types/closetItemTags.ts"
import { ITEM_KINDS, type ItemKind } from "../data/itemKinds.ts"
import { removeBackground } from "../lib/image_helpers/processImage.ts"

type props = {
    closet: ClosetItem[];
    setPage: (page: "home" | "closet") => void;
};

const WARMTH_STEPS = [
    { label: "None", value: 0 },
    { label: "Light", value: 0.2 },
    { label: "Medium", value: 0.4 },
    { label: "Warm", value: 0.6 },
    { label: "Very warm", value: 1 },
];

const MATERIALS = ["cotton", "denim", "fur", "knit", "leather", "linen", "silk", "suede", "wool"];

// swatch fill for color names CSS doesn't know
const SWATCH: Partial<Record<Color, string>> = { "light-blue": "lightblue", burgundy: "#800020", cream: "#fffdd0" };

// last word in the description that is a kind keyword ("Sweater Vest" -> vest)
function guessKind(description: string): ItemKind | undefined {
    const words = description.toLowerCase().split(/[^a-z]+/).reverse();
    for (const word of words) {
        const kind = ITEM_KINDS.find((k) => k.keywords.includes(word));
        if (kind) return kind;
    }
}

const toSlots = (text: string) => text.split(",").map((s) => s.trim()).filter(Boolean) as Slot[];

export default function AddItem({closet, setPage} : props) {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null); //for what is displayed
    const [processedPhoto, setProcessedPhoto] = useState<Blob | null>(null); //for what is upload to DB
    const [processing, setProcessing] = useState(false);               //loading state for the photo

    const [kind, setKind] = useState<ItemKind | null>(null);
    const [kindPicked, setKindPicked] = useState(false);  
    const [description, setDescription] = useState("");
    const [colors, setColors] = useState<Color[]>([]);
    const [pattern, setPattern] = useState<Pattern | null>(null);
    const [warmth, setWarmth] = useState(0);
    const [waterproof, setWaterproof] = useState(false);
    const [rainOnly, setRainOnly] = useState(false);
    const [materials, setMaterials] = useState<string[]>([]);
    const [brand, setBrand] = useState("");
    const [occupies, setOccupies] = useState("");
    const [requires, setRequires] = useState("");
    const [showAdvanced, setShowAdvanced] = useState(false);

    const brands = [...new Set(closet.flatMap((i) => i.tags ?? []).filter((t) => t.startsWith("brand:")).map((t) => t.slice(6)))];

    function chooseKind(k: ItemKind) {
        setKind(k);
        setWarmth(k.warmth);
        setOccupies((k.occupies ?? []).join(", "));
        setRequires((k.requires ?? []).join(", "));
    }

    function changeDescription(text: string) {
        setDescription(text);
        const guess = guessKind(text);
        if (!kindPicked && guess && guess !== kind) chooseKind(guess);
    }

    async function handlePhoto(file: File) {
        setProcessing(true);
        try {
            const result = await removeBackground(file);
            if (photoUrl) URL.revokeObjectURL(photoUrl);   // free the old preview
            setProcessedPhoto(result);
            setPhotoUrl(URL.createObjectURL(result));
        } finally {
            setProcessing(false);
        }
    }

    function choosePhoto(file: File | undefined) {
        if (file) handlePhoto(file);
    }

    function toggle<T>(list: T[], value: T): T[] {
        return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        collect_form_data();
    }

    // all data we need from form to create a new item in database
    function collect_form_data() {
        if (!kind) return;
        const tags = [
            ...colors.map((c) => `color:${c}`),
            ...(pattern ? [`pattern:${pattern}`] : []),
            ...materials.map((m) => `material:${m}`),
            ...(brand.trim() ? [`brand:${brand.trim()}`] : []),
            ...(rainOnly ? ["weather:rain"] : []),
        ].map((t) => t.toLowerCase());
        const base = { id: "", description, image_url: photoUrl ?? "", warmth, waterproof, tags };
        const item: ClosetItem =
            kind.type === "primary" ? { ...base, type: "primary", occupies: toSlots(occupies), requires: toSlots(requires) }
            : kind.type === "accessory" ? { ...base, type: "accessory", category: kind.category! }
            : { ...base, type: "outerwear" };
        
        console.log(JSON.stringify({ ...item, kind: kind.id }, null, 2));
        console.log(processedPhoto);
    }

    return (
        <div>
            <a href="#" className="home_btn" onClick={(e) => {
                e.preventDefault();
                setPage("home")
            }}> home </a>
            <p className="title"> Create Item </p>
            <button className="add_btn" onClick={() => setPage("closet")} aria-label="Cancel">✕</button>

            <form className="add_form" onSubmit={submit}>
                <section>
                    <h3>Photo</h3>
                    {processing && <p>Removing background…</p>}
                    {photoUrl && <img className="add_preview" src={photoUrl} alt="preview" />}
                    <div className="add_chips">
                        <label className="filter_btn">Take photo
                            <input type="file" accept="image/*" capture="environment" hidden onChange={(e) => choosePhoto(e.target.files?.[0])} />
                        </label>
                        <label className="filter_btn">Choose from library
                            <input type="file" accept="image/*" hidden onChange={(e) => choosePhoto(e.target.files?.[0])} />
                        </label>
                    </div>
                </section>

                <section>
                    <h3>Kind</h3>
                    <div className="add_chips">
                        {ITEM_KINDS.map((k) => (
                            <button type="button" key={k.id} className={k === kind ? "filter_btn active" : "filter_btn"} onClick={() => {
                                setKindPicked(true);
                                chooseKind(k);
                            }}>
                                {k.label}
                            </button>
                        ))}
                    </div>
                    {kind?.id === "dress" && (
                        <label className="add_check">
                            <input type="checkbox" checked={occupies.includes("top:2")} onChange={(e) =>
                                setOccupies(e.target.checked ? occupies.replace("top:1", "top:2") : occupies.replace("top:2", "top:1"))} />
                            Can you wear a top underneath?
                        </label>
                    )}
                </section>

                <section>
                    <h3>Description</h3>
                    <input className="add_text" value={description} onChange={(e) => changeDescription(e.target.value)} placeholder="e.g. Navy Wool Sweater" required />
                </section>

                <section>
                    <h3>Colors</h3>
                    <div className="add_chips">
                        {COLORS.map((c) => (
                            <button type="button" key={c} data-name={c} aria-label={c}
                                className={colors.includes(c) ? "add_swatch active" : "add_swatch"}
                                style={{ background: SWATCH[c] ?? c }}
                                onClick={() => setColors(toggle(colors, c))} />
                        ))}
                    </div>
                </section>

                <section>
                    <h3>Pattern</h3>
                    <div className="add_chips">
                        {PATTERNS.map((p) => (
                            <button type="button" key={p} className={p === pattern ? "filter_btn active" : "filter_btn"} onClick={() => setPattern(p === pattern ? null : p)}>
                                {p}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h3>Details</h3>
                    <p className="add_label">Warmth</p>
                    <div className="add_chips">
                        {WARMTH_STEPS.map((s) => (
                            <button type="button" key={s.label} className={s.value === warmth ? "filter_btn active" : "filter_btn"} onClick={() => setWarmth(s.value)}>
                                {s.label}
                            </button>
                        ))}
                    </div>
                    <label className="add_check">
                        <input type="checkbox" checked={waterproof} onChange={(e) => setWaterproof(e.target.checked)} /> Waterproof
                    </label>
                    <label className="add_check">
                        <input type="checkbox" checked={rainOnly} onChange={(e) => setRainOnly(e.target.checked)} /> Only wear in rain
                    </label>
                    <p className="add_label">Material</p>
                    <div className="add_chips">
                        {MATERIALS.map((m) => (
                            <button type="button" key={m} className={materials.includes(m) ? "filter_btn active" : "filter_btn"} onClick={() => setMaterials(toggle(materials, m))}>
                                {m}
                            </button>
                        ))}
                    </div>
                    <p className="add_label">Brand</p>
                    <input className="add_text" list="brands" value={brand} onChange={(e) => setBrand(e.target.value)} />
                    <datalist id="brands">
                        {brands.map((b) => <option key={b} value={b} />)}
                    </datalist>
                </section>

                {kind?.type === "primary" && (
                    <section>
                        <button type="button" className="filter_btn" onClick={() => setShowAdvanced(!showAdvanced)}>
                            Advanced {showAdvanced ? "▾" : "▸"}
                        </button>
                        {showAdvanced && (
                            <>
                                <p className="add_label">Occupies</p>
                                <input className="add_text" value={occupies} onChange={(e) => setOccupies(e.target.value)} />
                                <p className="add_label">Requires</p>
                                <input className="add_text" value={requires} onChange={(e) => setRequires(e.target.value)} />
                            </>
                        )}
                    </section>
                )}

                <button type="submit" className="filter_btn active add_submit" disabled={!kind}>Add item</button>
            </form>
        </div>
    )
}
