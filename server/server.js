const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const { Socket } = require('dgram');
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const port = process.env.PORT || 8080;
const RoomLinkMapper = new Map()

app.use(cors())

io.on('connection', (socket) => {
    console.log(`A new user with id of ${socket.id} has connected`);
    //Chat WebSocket Handler
    socket.on('create_room', (username, room, youtubeLink) => {
        console.log(username, room, youtubeLink);
        if (room) {
            socket.join(room)
            socket.emit('room_created', username, room, youtubeLink);
            RoomLinkMapper.set(room, youtubeLink)
        }
    })
    socket.on("join_room", (username, room) => {
        if (io.sockets.adapter.rooms.has(room)) {
            socket.join(room)
            //TODO: Fix, we dont want to emit here
            io.to(room).emit('room_joined', username, room, RoomLinkMapper.get(room));
        }
    })

    socket.on('init_session', (username, room) => {
        console.log(username, room)
        socket.emit("init_session_greetings", username, room)
    })

    socket.on('send_message', (username, message, room) => {
        console.log(message);
        socket.to(room).emit("receive_message", username, message)
    })

    //Video WebSocket Handler
    socket.on('pause_video', (room) => {
        socket.to(room).emit('server_pause_video')
    })
    socket.on('play_video', (room, currentTime) => {
        socket.to(room).emit('server_play_video', currentTime)
    })
})

server.listen(port, () => {
    console.log(`Server listening on port: ${port}...`)
})