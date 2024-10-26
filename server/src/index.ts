import express, { Application, Request, Response } from "express";
import "dotenv/config"; // Ensure .env is being loaded
import cors from "cors";
import Routes from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/reddis.config.js";
import { instrument } from "@socket.io/admin-ui";

const app: Application = express();
const PORT = process.env.PORT || 7000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true,
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});

setupSocket(io);
export { io };
// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Root Route
app.get("/", (req: any, res: any) => {
  return res.send("It's working Guys 🙌");
});

// * Routes
app.use("/api", Routes);

// Start the server
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
