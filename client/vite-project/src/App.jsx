import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState(null);

  // This navigates the user to a gameroom with the random name created in the createRoom() function
  useEffect(() => {
    if (roomName) {
      navigate(`/lobby/${roomName}`);
    }
  }, [roomName]);

  // This function creates a room name with four random variables, adverb, adjective, museum name and a random 3 digit number
  const createRoom = () => {
    const adverbs = ['Very', 'Nearly', 'Insanely', 'Amazingly'];
    const adjectives = ['Empty', 'Slippery', 'Brilliant', 'Dreamy'];
    const museumNames = ['MoMA', 'Louvre', 'PAMM', 'Guggenheim', 'Tate'];
  
    const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomName = museumNames[Math.floor(Math.random() * museumNames.length)];

    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    const uniqueRoomName = `${randomAdverb}_${randomAdjective}_${randomName}_${randomNumber}`;

    setRoomName(uniqueRoomName);
  };

  return (
    <div>
      <h1>PAMM Painting Game</h1>
      <button onClick={createRoom}>Create a Game Room</button>
      <button>Play Solo</button>
    </div>
  );
};

export default App;
