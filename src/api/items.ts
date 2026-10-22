import { supabase } from "../lib/supabase";
import type { ClosetItem } from "../types/ClosetItem";


//creates an item in the supabase DB
export async function createItem(item: ClosetItem, kind: string, image: Blob) {
    console.log(item);
    console.log(kind);
  // upload the image -> get the public url
  const fileName = `${crypto.randomUUID()}.png`;
  const { error: uploadError } = await supabase.storage.from("item-images")
  .upload(fileName, image, { contentType: "image/png" });
  if (uploadError) throw uploadError;

  //get the public url
  const { data : { publicUrl } } = supabase.storage.from("item-images").getPublicUrl(fileName);

  //Insert the item row (no id, no tags), with the real image URL
  
  const row = {
    description: item.description,
    type: item.type,
    image_url: publicUrl,
    warmth: item.warmth,
    waterproof: item.waterproof,
    occupies: "occupies" in item ? item.occupies : [],
    requires: "requires" in item ? item.requires : [],
    category: "category" in item ? item.category : null,
    kind,
  };

  const { data: saved, error: itemError } = await supabase
    .from("items")
    .insert(row)
    .select()
    .single();

  if (itemError) { //if fails, remove the image from DB
    //await supabase.storage.from("item-images").remove([fileName]);
    await removeImage(fileName);
    throw itemError;
  }

  //For each tag: create one if needed, and link to the item
  try {
    for (const tag of item.tags ?? []) { //in case item is empty use empty arr
        const i = tag.indexOf(":");
        const key = tag.slice(0, i);
        const value = tag.slice(i + 1);

        const { data: tagRow, error: tagError } = await supabase
            .from("tags")
            .upsert({ key, value }, { onConflict: "key,value" })
            .select("id")
            .single();
        if (tagError) throw tagError;

        const { error: linkError } = await supabase
            .from("item_tags")
            .insert({ item_id: saved.id, tag_id: tagRow.id });
        if (linkError) throw linkError;
    }
        

  } catch (err) {
        // undo everything: deleting the item also removes its links  
        const { error: deleteError } = await supabase.from("items").delete().eq("id", saved.id);
        if (deleteError) {
            console.error("Cleanup: item not deleted", saved.id, deleteError);
        } else {
            await removeImage(fileName);   // only once the item is gone
        }
        throw err;
  }

  // 4. Return the saved item (with its new id and real image_url) 
  return { ...item, id: saved.id, image_url: publicUrl };
}


async function removeImage(fileName: string) {
  const { data, error } = await supabase.storage.from("item-images").remove([fileName]);
  if (error || !data?.length) {
    console.error("Cleanup: image not removed", fileName, error);
  }
}