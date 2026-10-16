// Claude provided me the below code 
// takes local closet items data and creates them in Supabase DB 

import { config } from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { closet } from "../src/data/closetItems"; // hard-coded closet
import { ClosetItem } from "../src/types/ClosetItem";

config({ path: ".env.local" });

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function migrateItem(item: ClosetItem) {
  //Upload the image
  const localPath = path.join("public", item.image_url);  
  const fileName = path.basename(localPath);

  const { error: uploadError } = await supabase.storage
    .from("item-images")
    .upload(fileName, readFileSync(localPath), { contentType: "image/png", upsert: true });
  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage.from("item-images").getPublicUrl(fileName);

  //Insert the item & get its new id back
  const { data: row, error: itemError } = await supabase
    .from("items")
    .insert({
      type: item.type,
      description: item.description, // TODO: your field names
      image_url: publicUrl,
      warmth: item.warmth,
      waterproof: item.waterproof,
      occupies: "occupies" in item ? item.occupies : [],
      requires: "requires" in item ? item.requires : [],
      category: "category" in item ? item.category : null,
    })
    .select("id")
    .single();
  if (itemError) throw itemError;

  //For each tag: create it if it dne, then link it
  for (const tag of item.tags ?? []) {
    const [key, value] = tag.toLowerCase().split(":");

    const { data: tagRow, error: tagError } = await supabase
      .from("tags")
      .upsert({ key, value }, { onConflict: "key,value" })
      .select("id")
      .single();
    if (tagError) throw tagError;

    const { error: linkError } = await supabase
      .from("item_tags")
      .insert({ item_id: row.id, tag_id: tagRow.id });
    if (linkError) throw linkError;
  }

  console.log(`✓ ${item.description}`);
}

async function main() {
  for (const item of closet) {
    await migrateItem(item);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});