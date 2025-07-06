import React from 'react';
import type { Room } from '../types';
import { RoomCard } from './RoomCard';

interface RoomListProps {
  rooms: Room[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms }) => (
  <div>
    {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
  </div>
);