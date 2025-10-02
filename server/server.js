import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectMongo } from "./lib/db.js";

const PORT = process.env.PORT || 4000;

// create express app and http server
const app = express();
const server = http.createServer(app);

// middleware setup
app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => {
  res.send({ message: "Server is live!" });
});

// connect to mongodb
await connectMongo();

server.listen(PORT, () => {
  console.log(`Chat server is listening on port: ${PORT}`);
});
