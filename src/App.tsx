import React, { useState, useCallback } from 'react';
import { DojoTimer } from './features/timers/components/DojoTimer';
import { RoomList } from './features/rooms/components/RoomList';
import { AddRoomModal } from './features/rooms/components/AddRoomModal';
import { balancedRooms } from './state/store';
import { addRoom, rotateAllRooms } from './state/actions';
import "./App.css";
import { useSignal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

const App: React.FC = () => {
  useSignals(); // Initialize signals system
  const roomsSignal = useSignal(balancedRooms);
  const rooms = roomsSignal.value;
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (leader: string, language: string) => {
    addRoom(leader, language);
    setModalOpen(false);
  };

  const handleRotate = useCallback(() => {
    rotateAllRooms();
  }, []);

  return (
    <>
      <aside>
        <button onClick={() => setModalOpen(true)}>Add Room</button>
        <AddRoomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
        <DojoTimer onRotate={handleRotate} />
      </aside>
      <main>
        {rooms.value.length === 0 ? (
          <p>No rooms available. Please add a room to start.</p>
        ) : <RoomList rooms={rooms.value} />}
      </main>
    </>
  );
};

export default App;
