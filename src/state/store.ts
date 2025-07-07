import { signal, computed } from "@preact/signals-react";
import { ALL_PARTICIPANTS } from "../data/participants";
import type { Room, Participant } from "../features/rooms/types";

export const rooms = signal<Room[]>([]);

export const balancedRooms = computed(() => {
  const rs = rooms.value;
  const total = ALL_PARTICIPANTS.length;
  const count = rs.length;
  if (count === 0) return [];

  const perRoom = Math.floor(total / count);
  const extra = total % count;

  let start = 0;
  return rs.map((room, i) => {
    const size = perRoom + (i < extra ? 1 : 0);
    const slice = ALL_PARTICIPANTS.slice(start, start + size);
    start += size;
    const participants: Participant[] = slice.map((name, j) => ({
      id: `${room.id}-${j}`,
      name,
    }));
    return { ...room, participants };
  });
});
