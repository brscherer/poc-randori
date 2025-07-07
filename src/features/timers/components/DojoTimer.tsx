import React from 'react';
import { useDojoTimer } from '../hooks/useDojoTimer';
import styles from './DojoTimer.module.scss';
import { useSignals } from '@preact/signals-react/runtime';

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export const DojoTimer: React.FC<{ onRotate: () => void; onFinish: () => void }> = ({ onRotate, onFinish }) => {
  useSignals(); // Initialize signals system
  const { phase, timeLeft, running, start, stop } = useDojoTimer({ onRotate, onFinish });

  return (
    <div className={styles.timer}>
      <h2 className={styles.timer__title}>
        {phase === 'planning' ? 'Planning Phase' : 'Rotation Phase'}
      </h2>
      <p className={styles.timer__countdown}>{formatTime(timeLeft)}</p>
      <button
        className={`${styles.timer__button} ${running ? styles['timer__button--finish'] : styles['timer__button--start']
          }`}
        onClick={running ? stop : start}
      >
        {running ? 'Finish' : 'Start'}
      </button>
    </div>
  );
};
