import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState(null);

  useEffect(() => {
    if (roomName) {
      navigate(`/gameroom/${roomName}`);
    }
  }, [roomName]);

  const createRoom = () => {
    const list1 = ['Very', 'Nearly', 'Insanely', 'Amazingly'];
    const list2 = ['Empty', 'Slippery', 'Brilliant', 'Dreamy'];
    const list3 = ['MoMA', 'Louvre', 'PAMM', 'Guggenheim', 'Tate'];
  
    const word1 = list1[Math.floor(Math.random() * list1.length)];
    const word2 = list2[Math.floor(Math.random() * list2.length)];
    const word3 = list3[Math.floor(Math.random() * list3.length)];

    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    const uniqueRoomName = `${word1}_${word2}_${word3}_${randomNumber}`;

    setRoomName(uniqueRoomName);
  };

  return (
    <div>
      <h1>PAMM Painting Game</h1>
      <button onClick={createRoom}>Create a Game Room!</button>
    </div>
  );
};

export default App;
