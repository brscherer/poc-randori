import React, { useState, useCallback } from 'react';
import { DojoTimer } from './features/timers/components/DojoTimer';
import { RoomList } from './features/rooms/components/RoomList';
import { AddRoomModal } from './features/rooms/components/AddRoomModal';
import { ALL_PARTICIPANTS } from './data/participants';
import { balancedRooms } from './state/store';
import { addRoom } from './state/actions';
import "./App.css";

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (leader: string, language: string) => {
    addRoom(leader, language);
    setModalOpen(false);
  };

  const handleRotate = useCallback(() => {
    // setRooms(prev => prev.map(/* rotation logic */));
  }, []);

  const handleFinish = () => { /* finish logic */ };

  return (
    <>
      <aside>
        <button onClick={() => setModalOpen(true)}>Add Room</button>
        <AddRoomModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
        <DojoTimer onRotate={handleRotate} onFinish={handleFinish} />
      </aside>
      <main>
        <RoomList rooms={balancedRooms.value} />
        <p>{ALL_PARTICIPANTS.length} participants balanced across {balancedRooms.value.length} rooms.</p>
      </main>
    </>
  );
};

export default App;
