import http from 'http'
import { Server } from 'socket.io'
import { app } from '../webserver/config/app';



export const server = http.createServer(app)

export const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});


// Socket.IO connection event
io.on("connection", (socket) => {
    console.log('socket connect successfully!!')
    console.log('User Connected: ', socket.id)

    socket.on("setup", (userData) => {
        console.log(userData)
        socket.join(userData._id)
        socket.emit("connected")
    })

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room "+ room)
    })
});