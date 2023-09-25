import { Server } from "socket.io";

// initialize websocket server
const io = new Server({ cors: "http://localhost:3000"});

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log("New connection", socket.id);

  // listen for new connection
  socket.on('addNewUser', (userId) => {
    !onlineUsers.some((user) => user.userId == userId) &&
    onlineUsers.push({
      userId,
      socketId: socket.id
    });

    console.log("onlineUsers", onlineUsers);

    io.emit('getOnlineUsers', onlineUsers);
  });
});

// start websocket server on port 4000
io.listen(4000);