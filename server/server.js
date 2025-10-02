import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectMongo } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const PORT = process.env.PORT || 4000;

// create express app and http server
const app = express();
const server = http.createServer(app);
// socket.io server intialize
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// store online users
export const userSocketMap = {}; // userId: socketId

// socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected: ", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("User disconnected: ", userId);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  }
});

// middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

// route setup
app.use("/api/status", (req, res) => {
  res.send({ message: "Server is live!" });
});

app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

// connect to mongodb
await connectMongo();

server.listen(PORT, () => {
  console.log(`Chat server is listening on port: ${PORT}`);
});
