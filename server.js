const express = require('express');
const useSocket = require('socket.io')

const app = express();
const server = require('http').Server(app);
const io = useSocket(server);

app.use(express.json());

let rooms = new Map();

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
    else {
        //
    }
    res.send();
});

io.on('connection', socket => {
    console.log('user connected', socket.id);

    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users);
    })

    socket.on('disconnected', () => {
        rooms.forEach( (value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()];
                socket.to(roomId).broadcast.emit('ROOM:SET-USERS', users);
            }
        })
    })
})

server.listen(9999, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log('Cервер запущен.')
});