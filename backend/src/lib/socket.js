import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) return callback(null, true);

      // Allow localhost for development
      if (origin.includes('localhost')) return callback(null, true);

      // Allow all origins for LAN access (you can restrict this later)
      return callback(null, true);
    },
    credentials: true,
  },
  transports: ['websocket', 'polling'],
  allowEIO3: true,
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  console.log("Connection origin:", socket.handshake.headers.origin);
  console.log("Connection address:", socket.handshake.address);

  const userId = socket.handshake.query.userId;
  console.log("User ID from handshake:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("Updated userSocketMap:", Object.keys(userSocketMap));
  }

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log("Broadcasting online users:", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) {
      delete userSocketMap[userId];
      console.log("Removed user from map:", userId);
      console.log("Updated userSocketMap after disconnect:", Object.keys(userSocketMap));
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
