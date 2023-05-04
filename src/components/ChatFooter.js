import React, { useState } from 'react';

const ChatFooter = ({ addMessage }) => {
    const [message, setmessage] = useState('');
    function onSubmit(e) {
        e.preventDefault();
        console.log({ userName: localStorage.getItem('userName'), message });
        addMessage(message);
        setmessage('');        
    }
 
    return (
        <div className="chat__footer">
            <form className="form" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="编写消息"
                    className="message"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                />
                <button className="sendBtn">发送</button>
            </form>
        </div>
    );

}

export default ChatFooter;