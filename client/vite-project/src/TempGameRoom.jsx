import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';

function TempGameRoom() {
    const navigate = useNavigate();
    const { roomName } = useParams();
    const [score, setScore] = useState();
    const [userList, setUserList] = useState([]);
    const [socket, setSocket] = useState(null);
    const [userName, _] = useState(localStorage.getItem('username'));

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        newSocket.emit('joinRoom', roomName, userName);

        // Update the user list
        newSocket.on('updateUserList', (users) => {
            setUserList(users);
        });
    }, []); //roomName, userName (previous setup)

    const handleScoreSubmit = () => {
        if (socket) {
            socket.emit('sendScore', score);
        }
    }

    return (
        <div>
            <h2>Temp Game Room</h2>
            <h2>Username: {userName}</h2>
            <p>Enter a number:</p>
            <input type="text" onChange={(e) => {setScore(e.target.value)}} />
            <button onClick={handleScoreSubmit}>Submit</button>
            <h3>Users in the Room:</h3>
            <ul>
                {userList.map((user) => (
                <li key={user.id}>{user.userName}</li>
                ))}
            </ul>
        </div> 
    )
}

export default TempGameRoom;
