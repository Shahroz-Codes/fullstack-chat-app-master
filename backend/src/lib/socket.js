import { Server } from "socket.io";
import http from "http";
import express from "express";
import User from "../models/user.model.js";

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

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    try {
      const user = await User.findById(userId).select('fullName');
      if (user) {
        userSocketMap[userId] = socket.id;
        console.log(`🔌 ${user.fullName} connected`);
      }
    } catch (error) {
      console.log(`❌ Error fetching user for socket connection`);
    }
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  });
});

export { io, app, server };
