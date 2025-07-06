import { Room } from '../types';

export function useRotateRoom(rooms: Room[]): Room[] {
  return rooms.map((room) => {
    if (room.participants.length < 3) return room;
    const [pilot, copilot, ...rest] = room.participants;
    const newParticipants = [copilot, rest[0], ...rest.slice(1), pilot];
    return { ...room, participants: newParticipants };
  });
}