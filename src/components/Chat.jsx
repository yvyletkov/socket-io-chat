import React from "react";

const Chat = ({users}) => {

    let [messageValue, setMessageValue] = React.useState('');

    let onMessageInputChange = (e) => {
        setMessageValue(e.target.value)
    }

    return (
        <div className='chat'>
            <div className='chat-users'>
                <b>Users ({users.length}):</b>
                <ul>
                    {users.map( (name, index) => {
                        return <li key={name + index}>{name}</li>
                    })}
                </ul>
            </div>
            <div className='chat-messages'>

                <div className='messages'>
                    <div className='message'>
                        <p>Privet, kak dela?</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                    <div className='message'>
                        <p>Второе сообщение зачем-то</p>
                        <div>
                            <span>Test User</span>
                        </div>
                    </div>
                </div>

                <form>
                    <textarea value={messageValue} onChange={onMessageInputChange} rows='3'/>
                    <button className='btn btn-primary'>Send</button>
                </form>
            </div>
        </div>
    )
};

export default Chat;