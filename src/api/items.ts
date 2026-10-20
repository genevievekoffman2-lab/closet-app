import { supabase } from "../lib/supabase";
import type { ClosetItem } from "../types/ClosetItem";


//creates an item in the supabase DB
export async function createItem(item: ClosetItem, kind: string, image: Blob) {
    console.log(item);
    console.log(kind);
  //1. upload the image -> get the public url
  const fileName = `${crypto.randomUUID()}.png`;
  const { error: uploadError } = await supabase.storage.from("item-images")
  .upload(fileName, image, { contentType: "image/png" });
  if (uploadError) throw uploadError;

  //get the public url
  const { data } = supabase.storage.from("item-images").getPublicUrl(fileName);
  console.log(data);

  // 2. Insert the item row (no id, no tags), with the real image URL
  /*
  const { data: saved, error: itemError } = await supabase
    .from("items")
    .insert(row)
    .select()
    .single();

  if (itemError) { //if fails, remove the image from DB
    await supabase.storage.from("item-images").remove([fileName]);
    throw itemError;
  }*/


  // 3. For each tag:
  //    split "key:value"
  //    upsert into tags with onConflict "key,value", .select("id").single()
  //    insert into item_tags { item_id, tag_id }
  //    if any of this fails → delete the item and the image, then throw

  // 4. Return the saved item (with its new id and real image_url)
}