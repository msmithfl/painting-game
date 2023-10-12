import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRandomUsername } from './hooks/getRandomUsername.js';
import io from 'socket.io-client';

const Lobby = () => {
  const navigate = useNavigate();
  const { roomName } = useParams();
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
  }, []); //roomName, userName (previous setup)

  // Use to check if all players are ready
  useEffect(() => {
    // check if more than 1 user and all users are ready
    const allUsersReady = userList.length > 1 && userList.every((user) => user.isReady);

    if (allUsersReady) {
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
