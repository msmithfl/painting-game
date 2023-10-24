import React, { useEffect } from 'react'

function TestPostGame({ handleGetUsers, userList, socketID }) {
    useEffect(() => {
        handleGetUsers();
        console.log(userList);
    }, [])

  return (
    <div>
        <h2>Postgame</h2>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>{user.userName}{user.score}</li>
          ))}
        </ul>
    </div>
  )
}

export default TestPostGame