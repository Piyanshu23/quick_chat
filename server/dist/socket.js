import prisma from "./config/db.config.js";
export function setupSocket(io) {
    io.use((socket, next) => {
        const room = socket.handshake.auth.room;
        if (!room) {
            return next(new Error("Invalid Room"));
        }
        socket.room = room;
        next();
    });
    io.on("connection", (socket) => {
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
