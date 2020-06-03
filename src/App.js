import React from 'react';
import './App.css';
import socket from "./socket";
import reducer from './reducer'
import JoinBlock from "./components/JoinBlock";

function App() {

    const [state, dispatch] = React.useReducer(reducer, {
        isJoined: false,
        roomId: null,
        userName: null
    });

    const onLogin = (obj) => {
        dispatch({type: 'SET-JOINED', payload: obj});
        socket.emit('ROOM:JOIN', obj);

    }

    console.log('state = ', state);

    return (
        <div className="wrapper">
            {/*{!state.isAuth && <JoinBlock onLogin={onLogin}/>}*/}
            <JoinBlock onLogin={onLogin}/>
        </div>
    );
}

export default App;
