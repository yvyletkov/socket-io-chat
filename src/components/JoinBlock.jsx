import React from 'react';
import socket from '../socket';
import axios from 'axios'

function JoinBlock({onLogin}) {

    let [roomId, setRoomId] = React.useState('');
    let [userName, setUserName] = React.useState('');

    let [isLoading, setLoading] = React.useState(false);

    let handleSubmit = async () => {
        if (!roomId || !userName) {
            alert('Неверные данные')
        }
        else {
            setLoading(true);
            let obj = {roomId, userName};
            await axios.post('/rooms', obj);
            onLogin(obj);
            setLoading(false);
        }
    };

    return (
        <div className="join-block">
            <input type="text" placeholder="Room ID"
                value={roomId} onChange={(e) => {setRoomId(e.target.value)}} />
            <input type="text" placeholder="Ваше имя"
                value={userName} onChange={(e) => {setUserName(e.target.value)}} />
            <button disabled={isLoading} onClick={handleSubmit} className="btn btn-success">
                {isLoading ? '...ВХОД' : 'ВОЙТИ'}
            </button>
        </div>
    );
}

export default JoinBlock;