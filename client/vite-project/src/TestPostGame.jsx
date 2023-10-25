import React, { useEffect, useState } from 'react'

function TestPostGame({ socket, roomName }) {
  const [finalUsers, setFinalUsers] = useState([])
    const handleGetUsers = () => {
    //console.log(endUserList);
    //socket.emit('getUsers');
    // On the client-side
    socket.emit('getUsers', roomName); // Replace 'YourRoomName' with the actual room name

    socket.on('returnUsers', (userList) => {
      console.log('Users in the room:', userList);
      setFinalUsers(userList);
      // Do something with the userList
    });
  }

    useEffect(() => {
        handleGetUsers();
        //console.log(userList);
        //console.log(socket);
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

export default TestPostGame