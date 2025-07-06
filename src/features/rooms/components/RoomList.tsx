import React from 'react';
import type { Room } from '../types';
import { RoomCard } from './RoomCard';
import styles from './RoomList.module.scss';

interface RoomListProps {
  rooms: Room[];
}

export const RoomList: React.FC<RoomListProps> = ({ rooms }) => (
  <div className={styles['room-list']}>
    {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
  </div>
);