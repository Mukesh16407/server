const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const http = require("http");
const dbConfig = require("./config/dbConfig");
const usersRoute = require("./routes/usersRoute");
const messageRoute = require("./routes/messagesRoute");
const chatRoute = require("./routes/chatRouter");

const port = process.env.PORT || 5000;

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(cors());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// check the connection of socket from client

let onlineUsers = [];
io.on("connection", (socket) => {
  // socket events will be here
  socket.on("join-room", (userId) => {
    socket.join(userId);
  });
  // send message to clients (who are present in members array)
  socket.on("send-message", (message) => {
    io.to(message.members[0])
      .to(message.members[1])
      .emit("receive-message", message);
  });
  // clear unread messages
  socket.on("clear-unread-messages", (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit("unread-messages-cleared", data);
  });
  // typing event
  socket.on("typing", (data) => {
    io.to(data.members[0]).to(data.members[1]).emit("started-typing", data);
  });
  // online users

  socket.on("came-online", (userId) => {
    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }

    io.emit("online-users-updated", onlineUsers);
  });
  socket.on("went-offline", (userId) => {
    onlineUsers = onlineUsers.filter((user) => user !== userId);
    io.emit("online-users-updated", onlineUsers);
  });
});

app.use("/api/users", usersRoute);
app.use("/api/message", messageRoute);
app.use("/api/chat", chatRoute);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
