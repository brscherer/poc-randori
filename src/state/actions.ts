import type { Participant, Room } from "../features/rooms/types";
import { rooms, balancedRooms } from "./store";

export function addRoom(leader: string, language: string) {
  const newRoom: Omit<Room, "participants"> = {
    id: crypto.randomUUID(),
    index: rooms.value.length + 1,
    language,
    leader,
  };
  rooms.value = [...rooms.value, newRoom as Room];
}

export function removeRoom(roomId: string) {
  rooms.value = rooms.value.filter((r) => r.id !== roomId).map((r, i) => ({ ...r, index: i + 1 }));
}

export function rotateAllRooms() {
  const rotated = rotateParticipantsAcrossRooms(balancedRooms.value);
  rooms.value = rotated;
}

function rotateParticipantsAcrossRooms(roomsArr: Room[]): Room[] {
  const N = roomsArr.length;
  if (N === 0) return [];

  // Step 1: Extract rotation info without modifying structure
  const pilotsToInject: Participant[] = [];
  const trimmedRooms = roomsArr.map((room) => {
    const parts = [...room.participants];
    const oldPilot = parts.shift(); // remove pilot
    const copilot = parts.shift(); // remove copilot
    const rest = parts;

    if (!oldPilot || !copilot) return room;

    // Schedule the oldPilot to be added to next room
    pilotsToInject.push(oldPilot);

    // New participant list: copilot becomes pilot
    return {
      ...room,
      participants: [copilot, ...rest],
    };
  });

  // Step 2: Inject old pilots into next rooms
  const rotated = trimmedRooms.map((room, i) => {
    const newParts = [...room.participants];
    const fromPrevRoom = pilotsToInject[(i - 1 + N) % N];
    newParts.push(fromPrevRoom);
    return {
      ...room,
      participants: newParts,
    };
  });

  return rotated;
}
