import React from "react";
import socket from "../socket";

const Chat = ({users, messages, userName, roomId, onAddNewMessage}) => {

    let [messageValue, setMessageValue] = React.useState('');

    const messagesRef = React.useRef();

    React.useEffect( () => {
        messagesRef.current.scrollTo(0, 99999);
    }, [messages]);

    let onMessageInputChange = (e) => {
        setMessageValue(e.target.value)
    }

    let handleSubmit = () => {
        debugger
        socket.emit('ROOM:NEW-MESSAGE', {
            roomId,
            userName,
            text: messageValue
        });
        onAddNewMessage( {userName, text: messageValue} );
    }

    debugger
    return (
        <div className='chat'>
            <div className='chat-users'>
                <h5>RoomID: {roomId}</h5>
                <h6>Users ({users ? users.length:'0'}):</h6>
                <ul>
                    {users ? users.map( (name, index) => <li key={name + index}>{name}</li>) :
                    null }
                </ul>
            </div>
            <div className='chat-messages'>

                <div ref={messagesRef} className='messages'>
                    { messages ? messages.map( message => {
                        debugger
                        return <div className='message'>
                            <div className='message-body bg-primary'>{message ? message.text : null}</div>
                            <div>
                                <span>{message ? message.userName : null}</span>
                            </div>
                        </div>
                    }) : null}
                </div>

                <form>
                    <textarea value={messageValue} onChange={onMessageInputChange} rows='3'/>
                </form>
                    <button onClick={handleSubmit} className='btn btn-primary'>Send</button>
            </div>
        </div>
    )
};

export default Chat;