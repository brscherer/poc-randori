import React from 'react';
import styles from './RoomCard.module.scss';
import type { Room } from '../types';

export const RoomCard: React.FC<{ room: Room }> = ({ room }) => {
  const [pilot, copilot, ...others] = room.participants;

  return (
    <div className={styles['room-card']}>
      <h3 className={styles['room-card__header']}>
        Room {room.index} – {room.language}
      </h3>
      <p className={styles['room-card__text']}>Leader: {room.leader}</p>
      <p className={styles['room-card__text']}>
        Pilot: {pilot?.name ?? '[none]'}<br />
        Copilot: {copilot?.name ?? '[none]'}
      </p>
      {others.length > 0 && (
        <p className={styles['room-card__others']}>
          Others: {others.map(p => p.name).join(', ')}
        </p>
      )}
    </div>
  );
};
