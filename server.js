const express = require('express');
const useSocket = require('socket.io')

const app = express();
const server = require('http').Server(app);
const io = useSocket(server);

app.use(express.json())

const rooms = new Map();

app.get('/rooms', (req, res) => {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]))
    }
    else rooms.set(roomId, [...rooms.get(roomId), userName]);
    res.send();
});

io.on('connection', socket => {
    console.log('user connected', socket.id);
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').socket(socket.id, userName);
        const users = rooms.get(roomId).get('users').values()
    })
})

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Cервер запущен.')
});