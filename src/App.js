import React from 'react';
import './App.css';
import socket from "./socket";
import reducer from './reducer'
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";
import axios from "axios";

function App() {

    const [state, dispatch] = React.useReducer(reducer, {
        isJoined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = async obj => {
        dispatch({type: 'SET-JOINED', payload: obj});
        socket.emit('ROOM:JOIN', obj);
        const data = await axios.get(`/rooms/${obj.roomId}`, obj);
        console.log('dataaaaaaa', data.data)
        setUsers(data.data.users)
    };

    const setUsers = (users) => {
        dispatch({type: 'SET-USERS', users})
    };
    const setNewMessage = (message) => {
        debugger
        dispatch({type: 'SET-NEW-MESSAGE', payload: message})
    };

    React.useEffect( () => {
        debugger
        socket.on('ROOM:SET-USERS', setUsers);
        socket.on('ROOM:NEW-MESSAGE', setNewMessage);
    }, []);

    window.socket = socket;

    console.log('state = ', state);

    return (
        <div className="wrapper">
            {!state.isJoined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} onAddNewMessage={setNewMessage} />}
        </div>
    );
}

export default App;
