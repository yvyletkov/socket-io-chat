import React from 'react';
import './App.css';
import socket from "./socket";
import reducer from './reducer'
import JoinBlock from "./components/JoinBlock";
import Chat from "./components/Chat";

function App() {

    const [state, dispatch] = React.useReducer(reducer, {
        isJoined: false,
        roomId: null,
        userName: null,
        users: [],
        messages: []
    });

    const onLogin = (obj) => {
        dispatch({type: 'SET-JOINED', payload: obj});
        socket.emit('ROOM:JOIN', obj);
    };

    const setUsers = (users) => {
        dispatch({type: 'SET-USERS', users})
    }

    React.useEffect( () => {
        socket.on('ROOM:JOINED', users => {
            console.log('user joined chat; users array: ', users);
            setUsers(users);
        });
        socket.on('ROOM:SET-USERS', users => {
            console.log('user leaved chat; users array: ', users);
            setUsers(users);
        });
    }, []);

    window.socket = socket;

    console.log('state = ', state);

    return (
        <div className="wrapper">
            {!state.isJoined ? <JoinBlock onLogin={onLogin}/> : <Chat users={state.users}/>}
        </div>
    );
}

export default App;
