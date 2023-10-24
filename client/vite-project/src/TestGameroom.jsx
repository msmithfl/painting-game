import React, { useEffect, useState } from 'react';

function TestGameroom({ roomName, handleScoreSubmit }) {
  const [score, setScore] = useState();
  const [timer, setTimer] = useState(20); // Set the initial countdown time in seconds

  useEffect(() => {
    // Start the countdown when the component mounts
    const countdownInterval = setInterval(() => {
      // Decrement the timer by 1 second
      setTimer((prevTimer) => prevTimer - 1);

      // Check if the timer has reached 0
      if (timer === 0) {
        // Perform any action when the timer reaches 0 (e.g., submit the score)
        handleScoreSubmit(score);
        
        // Clear the interval to stop the countdown
        clearInterval(countdownInterval);
      }
    }, 1000); // Update the timer every 1 second

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(countdownInterval);
    };
  }, [handleScoreSubmit, timer]);

  return (
    <div>
      <h2>Gameroom: {roomName}</h2>
      <p>Time left: {timer} seconds</p>
      <input onChange={(e) => setScore(e.target.value)} />
      <button onClick={handleScoreSubmit}>Submit Score</button>
    </div>
  );
}

export default TestGameroom;
