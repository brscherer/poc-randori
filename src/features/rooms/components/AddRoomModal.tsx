import React, { useState } from 'react';
import styles from './AddRoomModal.module.scss';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leader: string, language: string) => void;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [leader, setLeader] = useState('');
  const [language, setLanguage] = useState('');
  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles['modal__content']}>
        <h2 className={styles['modal__title']}>New Room</h2>
        <label className={styles['modal__label']}>Leader:
          <input
            className={styles['modal__input']}
            value={leader}
            onChange={e => setLeader(e.target.value)}
          />
        </label>
        <label className={styles['modal__label']}>Language:
          <input
            className={styles['modal__input']}
            value={language}
            onChange={e => setLanguage(e.target.value)}
          />
        </label>
        <div className={styles['modal__controls']}>
          <button className={`${styles['modal__button']} ${styles['modal__button--cancel']}`} onClick={onClose}>
            Cancel
          </button>
          <button
            className={`${styles['modal__button']} ${styles['modal__button--create']}`}
            onClick={() => {
              onSubmit(leader.trim(), language.trim());
              setLeader(''); setLanguage('');
            }}
            disabled={!leader || !language}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
