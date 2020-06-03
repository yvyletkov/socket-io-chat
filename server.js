const express = require('express');
const useSocket = require('socket.io')

const app = express();
const server = require('http').Server(app);
const io = useSocket(server);

app.use(express.json());

let rooms = new Map();

app.get('/rooms/:id', (req, res) => {
    const roomId = req.params.id;

    console.log('room id', roomId)
    const obj = rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    } : {
        users: [],
        messages: []
    }
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
        ]))
    }
    res.send();
});

io.on('connection', socket => {
    console.log('user connected', socket.id);

    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        socket.to(roomId).broadcast.emit('ROOM:SET-USERS', users);
    });

    socket.on('ROOM:NEW-MESSAGE', ({roomId, userName, text}) => {
        debugger
        const obj = {userName, text};
        rooms.get(roomId).get('messages').push(obj);
        socket.to(roomId).broadcast.emit('ROOM:NEW-MESSAGE', obj);

    });

    socket.on('disconnect', () => {
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