import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

// This function creates a random user name for each player using 4 variables
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
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [userName, _] = useState(getRandomUsername());

  const [socket, setSocket] = useState(null);

  // This joins a gameroom with the URL parameter roomName
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    // Join the room
    newSocket.emit('joinRoom', roomName, userName);

    // Update the user list
    newSocket.on('updateUserList', (users) => {
      setUserList(users);
    });
    
    // Cleanup after socket is unmounted
    return () => {
      newSocket.disconnect();
    };
  }, [roomName, userName]);

  // Use to check if all players are ready
  useEffect(() => {
    // allUsersReady is only set to true if the userList is not empty (userList.length > 0) and if all users in the list have their isReady property set to true
    const allUsersReady = userList.length > 0 && userList.every((user) => user.isReady);

    if (allUsersReady){
      console.log('All Users Ready!');
    }
  }, [userList])

  const handlePlayerReady = () => {
    setIsPlayerReady(!isPlayerReady);

    // Emit the 'playerReady' event to the server
    if (socket) {
      socket.emit('playerReady', isPlayerReady);
    }
  }

  return (
    <div>
      <h2>Room: {roomName}</h2>
      <h3>Users in the Room:</h3>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>{user.userName}{user.isReady ? <p>Ready</p> : <p>Not Ready</p>}</li>
        ))}
      </ul>
      <button onClick={handlePlayerReady}>{isPlayerReady ? "Waiting..." : "Ready?"}</button>
    </div>
  );
};

export default Room;
