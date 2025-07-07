import { signal, computed } from "@preact/signals-react";
import { ALL_PARTICIPANTS } from "../data/participants";
import type { Room, Participant } from "../features/rooms/types";

export const rooms = signal<Room[]>([]);

export const balancedRooms = computed(() => {
  const rs = rooms.value;
  const total = ALL_PARTICIPANTS.length;
  const count = rs.length;
  if (count === 0) return [];

  // Initial load: if no participants assigned, distribute evenly
  const isFresh = rs.every((r) => !r.participants?.length);
  if (isFresh) {
    const perRoom = Math.floor(total / count);
    const extra = total % count;
    let start = 0;
    return rs.map((room, i) => {
      const size = perRoom + (i < extra ? 1 : 0);
      const slice = ALL_PARTICIPANTS.slice(start, start + size);
      start += size;
      return {
        ...room,
        participants: slice.map((name, j) => ({
          id: `${room.id}-${j}`,
          name,
        })),
      };
    });
  }

  // Otherwise, preserve existing participants (with updated order over time)
  return rs;
});
