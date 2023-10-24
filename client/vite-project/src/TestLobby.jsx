import React from 'react'

function TestLobby({roomName, userList, isPlayerReady, handlePlayerReady, handleShowUsers}) {
  return (
    <div>
        <h2>Lobby: {roomName}</h2>
        <h3>Users in the Room:</h3>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>{user.userName}{user.isReady ? <p>Ready</p> : <p>Not Ready</p>}</li>
          ))}
        </ul>
        <button onClick={handlePlayerReady}>{isPlayerReady ? "Waiting..." : "Ready?"}</button>
        <button onClick={handleShowUsers}>Show Users In Room</button>
    </div>
  )
}

export default TestLobby