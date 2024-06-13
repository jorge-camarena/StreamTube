const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 8080;

io.on('connection', (socket) => {
    console.log(`A new user with id of ${socket.id} has connected`);
})

server.listen(port, () => {
    console.log(`Server listening on port: ${port}...`)
})