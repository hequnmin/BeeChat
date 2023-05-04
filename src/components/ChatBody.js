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
// {/* 显示你发送消息的内容 */}
// <div className="message__container">
// <div className="message__chats">
//   <p className="sender__name">You</p>
//   <div className="message__sender">
//     <p>Hello there</p>
//   </div>
// </div>

// {/*显示你接收消息的内容*/}
// <div className="message__chats">
//   <p>Other</p>
//   <div className="message__recipient">
//     <p>Hey, I'm good, you?</p>
//   </div>
// </div>
// </div>