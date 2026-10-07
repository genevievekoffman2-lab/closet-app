import type { ClosetItem } from "../types/ClosetItem.ts";

export function pickRandom(items: ClosetItem[]): ClosetItem | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}