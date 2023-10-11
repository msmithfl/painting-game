import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const getRandomUsername = () => {
  const adverbs = ['Whimsically', 'Wackily', 'Hilariously', 'Zestily', 'Quirkily'];
  const adjectives = ['Zany', 'Boisterous', 'Eccentric', 'Ludicrous', 'Bizarre', 'Buff'];
  const paintersLastNames = ['Da Vinci', 'Van Gogh', 'Picasso', 'Rembrandt', 'Monet', 'Michelangelo'];
  
  const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomLastName = paintersLastNames[Math.floor(Math.random() * paintersLastNames.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number

  return `${randomAdverb}_${randomAdjective}_${randomLastName}_${randomNumber}`;
}

const Room = () => {
  const { roomName } = useParams();
  const [userList, setUserList] = useState([]);
  const [userName, _] = useState(getRandomUsername());

  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.emit('joinRoom', roomName, userName);

    socket.on('updateUserList', (users) => {
      setUserList(users);
    });
    
    return () => {
      socket.disconnect();
    };
  }, [roomName]);

  return (
    <div>
      <h2>Room: {roomName}</h2>
      <h3>Users in the Room:</h3>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>{user.userName}</li>
        ))}
      </ul>
      {/* Add room-specific content and functionality here */}
    </div>
  );
};

export default Room;
