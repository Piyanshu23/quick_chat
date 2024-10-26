import { Server, Socket } from "socket.io";
import prisma from "./config/db.config.js";

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room;
    if (!room) {
      return next(new Error("Invalid Room"));
    }

    socket.room = room;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    //join the room
    socket.join(socket.room);

    socket.on("message", async (data) => {
      console.log("Server Side Message", data);
      await prisma.chats.create({
        data: data,
      });
      // socket.broadcast.emit("message", data);
      socket.to(socket.room).emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("A User Disconnected", socket.id);
    });
  });
}
