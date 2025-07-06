import React, { useState, useCallback } from 'react';
import { DojoTimer } from './features/timers/components/DojoTimer';
import { RoomList } from './features/rooms/components/RoomList';
import { AddRoomModal } from './features/rooms/components/AddRoomModal';
import { createRoom } from './features/rooms/roomService';
import { ALL_PARTICIPANTS } from './data/participants';
import type { Room } from './features/rooms/types';
import "./App.css"; // Assuming you have some global styles

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = (leader: string, language: string) => {
    const newIndex = rooms.length + 1;
    const newRoom = createRoom(newIndex, leader, language, newIndex);
    setRooms(prev => [...prev, newRoom]);
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
        <RoomList rooms={rooms} />
        <p>{ALL_PARTICIPANTS.length} participants balanced across {rooms.length} rooms.</p>
      </main>
    </>
  );
};

export default App;
