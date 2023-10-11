const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3001;

const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());

const io =  new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
});

// Initialize an object to store users in rooms
const usersInRooms = {};

io.on('connection', (socket) => {
  console.log(`A user ${socket.id} connected`);

  socket.on('joinRoom', (roomName, userName) => {
    socket.join(roomName);
    console.log(`${userName} (${socket.id})  joined room: ${roomName}`);

    // Add the user to the list of users in the room
    if (!usersInRooms[roomName]) {
      usersInRooms[roomName] = [];
    }
    usersInRooms[roomName].push({ id: socket.id, userName: userName, roomName: roomName});

    // Emit the updated list of users to all users in the room
    io.to(roomName).emit('updateUserList', usersInRooms[roomName]);
    console.log(usersInRooms[roomName]);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);

    // Handle user removal from all rooms when they disconnect
    Object.keys(usersInRooms).forEach((roomName) => {
      //usersInRooms[roomName] = usersInRooms[roomName].filter((id) => id !== socket.id);
      usersInRooms[roomName] = usersInRooms[roomName].filter((user) => user.id !== socket.id);
      // Emit the updated list of users to all users in the room
      io.to(roomName).emit('updateUserList', usersInRooms[roomName]);
      console.log(usersInRooms[roomName]);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
