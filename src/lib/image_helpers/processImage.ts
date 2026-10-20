// processes the image before adding to DB
// removes background
// TODO add more functionality later on

import { removeBackground as imglyRemove } from "@imgly/background-removal";


export async function removeBackground(img: Blob): Promise<Blob> {
  return imglyRemove(img);   // returns a PNG with a transparent background
}