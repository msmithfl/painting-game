import React, { useEffect, useState } from 'react'

function PostGame({ socket, roomName }) {
  const [finalUsers, setFinalUsers] = useState([])

  const handleGetUsers = () => {

    socket.emit('getUsers', roomName);

    socket.on('returnUsers', (userList) => {
      setFinalUsers(userList);
    });
  }

    useEffect(() => {
        handleGetUsers();
    }, [])

  return (
    <div>
        <h2>Postgame</h2>
        <ul>
          {finalUsers.map((user) => (
            <li key={user.id}>
              <p>{user.userName}</p>
              <p>{user.score}</p>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default PostGame