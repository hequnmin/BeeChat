import React from 'react';
import { useNavigate } from 'react-router-dom';

import MessageList from './MessageList'

const ChatBody = (messages) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => { //离开聊天界面退出登录
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          退出聊天
        </button>
      </header>
      <div className="message__container">
        <div className="message__chats">
          <MessageList messages={messages} />
        </div>
      </div>

    </>
  );
};

export default ChatBody;