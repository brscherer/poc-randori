import type { Room } from "../features/rooms/types";
import { rooms } from "./store";

export function addRoom(leader: string, language: string) {
  const newRoom: Omit<Room, "participants"> = {
    id: crypto.randomUUID(),
    index: rooms.value.length + 1,
    language,
    leader,
  };
  console.log("Adding new room:", newRoom);
  rooms.value = [...rooms.value, newRoom as Room];
}

export function removeRoom(roomId: string) {
  rooms.value = rooms.value.filter((r) => r.id !== roomId).map((r, i) => ({ ...r, index: i + 1 }));
}
