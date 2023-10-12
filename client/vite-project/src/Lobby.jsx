import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';

// This function creates a random user name for each player using 4 variables
const getRandomUsername = () => {
  // If the username has already been set in localStorage, use that **NOT WORKING ATM
  // if (localStorage.getItem('username') !== null) { return localStorage.getItem('username') }

  const adverbs = ['Whimsically', 'Wackily', 'Hilariously', 'Zestily', 'Quirkily'];
  const adjectives = ['Zany', 'Boisterous', 'Eccentric', 'Ludicrous', 'Bizarre', 'Buff'];
  const paintersLastNames = ['Da Vinci', 'Van Gogh', 'Picasso', 'Rembrandt', 'Monet', 'Michelangelo'];
  
  const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomLastName = paintersLastNames[Math.floor(Math.random() * paintersLastNames.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number

  return `${randomAdverb}_${randomAdjective}_${randomLastName}_${randomNumber}`;
}

const Lobby = () => {
  const { roomName } = useParams();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [userName, _] = useState(getRandomUsername());
  localStorage.setItem('username', userName);

  const [socket, setSocket] = useState(null);

  // This joins a room (lobby) with the URL parameter roomName (set in previous screen, App.jsx)
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
    // changed to userList.length > 1 to account for if a user leaving room briefly
    const allUsersReady = userList.length > 1 && userList.every((user) => user.isReady);

    if (allUsersReady){
      //console.log('All Users Ready!');
      
      navigate(`/gameroom/${roomName}`);
    }
  }, [userList]);

  const handlePlayerReady = () => {
    setIsPlayerReady(!isPlayerReady);
    // Emit the 'playerReady' event to the server
    if (socket) { socket.emit('playerReady', isPlayerReady); }
  }

  const handleShowUsers = () => {
    console.log(userList);
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
      <button onClick={handleShowUsers}>Show Users In Room</button>
    </div>
  );
};

export default Lobby;
