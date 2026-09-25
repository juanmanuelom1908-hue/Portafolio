import type { PlayerData } from "../types/player";

const API_URL = "http://localhost:3001/api/cards";

export interface SavedCard extends PlayerData {
  id: number;
}

export async function getCards(): Promise<SavedCard[]> {
  const res = await fetch(API_URL);
  return res.json();
}

export async function saveCard(player: PlayerData): Promise<SavedCard> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  return res.json();
}

export async function deleteCard(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}