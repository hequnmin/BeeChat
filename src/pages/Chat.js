import React, { useEffect, useState } from 'react'
import ChatBar from '../components/ChatBar'
import ChatBody from '../components/ChatBody'
import ChatFooter from '../components/ChatFooter'
const Chat = ({ socket }) => {
  const [messages, setmessages] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState('');
  useEffect(() => {
    socket.on('RECEIVE_MESSAGE', (data) => setmessages([...messages, data]));
  }, [socket, messages]);
  function addMessage(message) {
    var data = {
      id: message.length,
      author: localStorage.getItem('userName'),
      message: message,
      peer:JSON.parse(selectedPeer)
    }
    setmessages([...messages, data]);
    socket.emit('SEND_MESSAGE', data);
    console.log("LOCAL MESSAGE DATA");
  }
  function SendSelectedPeer(peer) {
    setSelectedPeer(peer);
}
  return (
    <div className="chat">
      <ChatBar socket={socket} SendSelectedPeer={SendSelectedPeer} selectedPeer={ selectedPeer} />
      <div className='chat_main'>
        <ChatBody messages={messages} />
        <ChatFooter addMessage={addMessage} />
      </div>
    </div>
  )

}

export default Chat
