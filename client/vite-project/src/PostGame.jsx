import React, { useEffect, useState } from 'react';

function PostGame({ socket, roomName }) {
  const [finalUsers, setFinalUsers] = useState([]);
  const [countdown, setCountdown] = useState(10); // Initial countdown time in seconds

  const handleGetUsers = () => {
    socket.emit('getUsers', roomName);

    socket.on('returnUsers', (userList) => {
      setFinalUsers(userList);
    });
  };

  useEffect(() => {
    handleGetUsers();

    // Use setInterval to update the countdown every second
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        // When the countdown reaches 0, reload the page
        clearInterval(timer); // Stop the countdown timer
        window.location.reload();
      }
    }, 1000); // Update the countdown every second

    return () => {
      // Clear the countdown timer when the component unmounts to avoid memory leaks
      clearInterval(timer);
    };
  }, [roomName, countdown]);

  return (
    <div>
      <h2>Postgame</h2>
      <p>Countdown: {countdown} seconds</p>
      <ul>
        {finalUsers.map((user) => (
          <li key={user.id}>
            <p>{user.userName}</p>
            <p>{user.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostGame;
