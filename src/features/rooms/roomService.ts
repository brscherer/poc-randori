import { ALL_PARTICIPANTS } from "../../data/participants";
import type { Room, Participant } from "./types";

export function createRoom(
  index: number,
  leader: string,
  language: string,
  totalRooms: number
): Room {
  const perRoom = Math.floor(ALL_PARTICIPANTS.length / totalRooms);
  const start = perRoom * (index - 1);
  const roomNames = ALL_PARTICIPANTS.slice(start, start + perRoom);
  const participants: Participant[] = roomNames.map((name, idx) => ({
    id: `${index}-${idx}`,
    name
  }));

  return { id: crypto.randomUUID(), index, leader, language, participants };
}
