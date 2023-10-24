import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRandomUsername } from './hooks/getRandomUsername.js';
import io from 'socket.io-client';
import TestLobby from './TestLobby.jsx';
import TestGameroom from './TestGameroom.jsx';
import TestPostGame from './TestPostGame.jsx';

const Lobby = () => {
  const { roomName } = useParams();
  const [userList, setUserList] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [userName, _] = useState(getRandomUsername());
  const [gameState, setGameState] = useState('lobby');
  
  const [socket, setSocket] = useState(null);
  
  localStorage.setItem('username', userName);

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
  }, []);

  // Checking if all players are ready
  useEffect(() => {
    // check if more than 1 user and all users are ready
    const allUsersReady = userList.length > 1 && userList.every((user) => user.isReady);

    if (allUsersReady) {
      console.log('All Users Ready!');
      setGameState('gameroom');
    } else {
      console.log('Waiting for Users...')
    }
  }, [userList]);

  const handlePlayerReady = () => {
    setIsPlayerReady(!isPlayerReady);
    // Emit the 'playerReady' event to the server
    if (socket) { socket.emit('playerReady', isPlayerReady); }
  }

  const handleScoreSubmit = (score) => {
    console.log(score);
    socket.emit('sendScore', score); 
    setGameState('postgame');
    console.log(userList);
    //in final implementation this gameState should be set to 'postgame' when the timer is up
  }

  const handleGetUsers = () => {
    //console.log(endUserList);
    socket.emit('getUsers');
  }

  return (
    <div>
      {gameState === 'lobby' && 
        <TestLobby
          roomName={roomName}
          userList={userList}
          isPlayerReady={isPlayerReady}
          handlePlayerReady={handlePlayerReady}
        />
      }
      {gameState === 'gameroom' &&
        <TestGameroom 
          roomName={roomName}
          handleScoreSubmit={handleScoreSubmit}
        />
      }
      {gameState === 'postgame' &&
        <TestPostGame
          handleGetUsers={handleGetUsers}
          userList={userList}
        />
      }
    </div>
  );
};

export default Lobby;


///// if needed, put this in main useEffect
//    
    // // Cleanup after socket is unmounted
    // return () => {
    //   newSocket.disconnect();
    // };
