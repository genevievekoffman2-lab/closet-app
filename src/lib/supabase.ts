// Supabase client (anon key, read-only) + loading the closet

import { createClient } from "@supabase/supabase-js";
import type { AccessoryCategory, ClosetItem, Slot } from "../types/ClosetItem";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

type ItemRow = {
  id: string;
  type: "primary" | "outerwear" | "accessory";
  description: string;
  image_url: string | null;
  warmth: number;
  waterproof: boolean;
  occupies: string[];
  requires: string[];
  category: string | null;
  tags: { key: string; value: string }[];
};

// loads every item with its tags in one query
export async function fetchCloset(): Promise<ClosetItem[]> {
  const { data, error } = await supabase
    .from("items")
    .select("id, type, description, image_url, warmth, waterproof, occupies, requires, category, tags(key, value)");
  if (error) throw error;
  return (data as ItemRow[]).map(toClosetItem);
}

// db row -> ClosetItem: tag rows become "key:value", occupies/requires only on primary, category only on accessory
function toClosetItem(row: ItemRow): ClosetItem {
  const base = {
    id: row.id,
    description: row.description,
    image_url: row.image_url ?? "",
    warmth: row.warmth,
    waterproof: row.waterproof,
    tags: row.tags.map((t) => `${t.key}:${t.value}`),
  };
  if (row.type === "primary")
    return { ...base, type: "primary", occupies: row.occupies as Slot[], requires: row.requires as Slot[] };
  if (row.type === "accessory")
    return { ...base, type: "accessory", category: row.category as AccessoryCategory };
  return { ...base, type: "outerwear" };
}
