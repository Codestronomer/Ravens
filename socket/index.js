import { Server } from "socket.io";

// initialize websocket server
const io = new Server({ cors: "http://localhost:3000"});

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log("New connection", socket.id);

  // listen for new connection and add new user to online users
  socket.on('addNewUser', (userId) => {
    if (userId !== null) {
      !onlineUsers.some((user) => user.userId == userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id
      });
    }
    console.log("onlineUsers", onlineUsers);

    io.emit('getOnlineUsers', onlineUsers);
  });

  socket.on('sendMessage', (message) => {
    const user = onlineUsers.find((user) => user.userId === message.recipientId);

    if (user) {
      io.to(user.socketId).emit('getMessage', message);
      io.to(user.socketId).emit('getNotification', {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  })

  // remove user from online user when socket is disconnected
  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit('getOnlineUsers', onlineUsers);
  })
});

// start websocket server on port 4000
io.listen(4000);

export default io;