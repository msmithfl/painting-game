import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getRandomUsername } from './hooks/getRandomUsername.js';
import io from 'socket.io-client';
import TestLobby from './TestLobby.jsx';
import TestGameroom from './TestGameroom.jsx';
import TestPostGame from './TestPostGame.jsx';

const Lobby = () => {
  const navigate = useNavigate();
  const { roomName } = useParams();
  const [userList, setUserList] = useState([]);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [userName, _] = useState(getRandomUsername());
  const [gameState, setGameState] = useState('lobby');
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
    
    // // Cleanup after socket is unmounted
    // return () => {
    //   newSocket.disconnect();
    // };
  }, []); //roomName, userName (previous setup)

  // Checking if all players are ready
  useEffect(() => {
    // check if more than 1 user and all users are ready
    const allUsersReady = userList.length > 1 && userList.every((user) => user.isReady);

    if (allUsersReady) {
      console.log('All Users Ready!');
      //navigate(`/gameroom/${roomName}`);
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

  const handleShowUsers = () => {
    console.log(userList);
  }

  const handleScoreSubmit = (score) => {
    console.log(score);
    //in final implementation this gameState should be set to 'postgame' when the timer is up
    setGameState('postgame');
  }

  return (
    <div>
      {gameState === 'lobby' && 
        <TestLobby
          roomName={roomName}
          userList={userList}
          isPlayerReady={isPlayerReady}
          handlePlayerReady={handlePlayerReady}
          handleShowUsers={handleShowUsers}
        />
      }
      {gameState === 'gameroom' &&
        <TestGameroom 
          roomName={roomName}
          handleScoreSubmit={handleScoreSubmit}
        />
      }
      {gameState === 'postgame' &&
        <TestPostGame />
      }
    </div>
  );
};

export default Lobby;
