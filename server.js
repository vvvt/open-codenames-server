import express from 'express'
import { createServer } from 'http';
import * as io from "socket.io"
import GameData from './classes/gameData.js';

const app = express();
const server = createServer(app);
const socketio = new io.Server(server, {
  cors: {
    origin: '*',
  }
});
const port = process.env.PORT || 3001;
const roomData = [];

app.use(express.static('public'));

socketio.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on("join", room => {
    if (!socketio.sockets.adapter.rooms.has(room)) {
      initRoomData(room);
    }
    console.log(socket.rooms.values().length);
    socket.join(room);
    console.log(socketio.sockets.adapter.rooms);
  });

  socket.on("data", (args, callback) => {
    const rooms = Array.from(socket.rooms);
    const currentRoom = rooms[rooms.length - 1];
    const data = roomData.find(room => room.code === currentRoom);
    callback(data)
  });

  socket.on("turn", data => {
    const rooms = Array.from(socket.rooms);
    const currentRoom = rooms[rooms.length - 1];
    const currentRoomData = roomData.find(room => room.code === currentRoom)
    if (currentRoomData) currentRoomData.data = data;
    socketio.to(currentRoom).emit("turn", data);
  })

  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));

function initRoomData(room) {
  const gameData = GameData.getGameData();
  roomData.push({
    code: room,
    data: gameData,
  })
}
