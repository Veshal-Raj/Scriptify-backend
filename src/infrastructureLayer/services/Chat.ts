import http from 'http'
import { Server } from 'socket.io'
import { app } from '../webserver/config/app';

interface IUsers {
    userId: string;
    socketId: string;
    lastSeen?: Date;
    online?: boolean;
}

export const server = http.createServer(app)

export const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

let users: IUsers[] = []


const addUser = (userId: string, socketId: string) => {
    const existingUserIndex = users.findIndex(user => user.userId === userId);
    if (existingUserIndex !== -1) {
        const existingUser = users[existingUserIndex]
        console.log(existingUser)
        existingUser.socketId = socketId
    } else {
        users.push({ userId, socketId})
    }
}

const userExists = (userId: string) => {
    return users.some(user => user.userId === userId);
};

// Socket.IO connection event
io.on("connection", (socket) => {
    
    socket.on("setup", (userId) => {
        console.log('userData --- ',userId)
        addUser(userId, socket.id)
        
        socket.join(userId)
        socket.emit("connected")
        console.log('connected')
        console.log(users)
    })

    socket.on("join chat", (room) => {
        console.log('room --- ', room)
        socket.join(room);
        console.log("user joined room "+ room)
    })

    socket.on("send_message", (data) => {
        console.log('message --->> ', data)
        console.log('receiver id -- ',data.receiver.id)
        if (userExists(data.receiver.id)) {
            const receiver = users.find(user => user.userId === data.receiver.id);
            if (receiver) {
                console.log('Receiver data:', receiver);    
                io.to(receiver.socketId).emit("receive_message", data);
            }
        } else console.log('no user ')
        
        
    })

    

    socket.on("error", (err) => {
        console.error('Socket error:', err);
    });
});