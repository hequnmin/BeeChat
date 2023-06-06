import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import moment from 'moment';

import ChatBar from '../components/ChatBar'
import ChatBody from '../components/ChatBody'
import ChatFooter from '../components/ChatFooter'
import ChatEmpty from '../components/ChatEmpty'
const Chat = () => {
  const [messages, setmessages] = useState([]);
  const [selectedPeer, setSelectedPeer] = useState('');
  // useEffect(() => {
  //   ipcRenderer.on('receive_message', (data) => setmessages([...messages, data]));
  // }, [messages]);
  function addMessage(message) {
    var msg = {
      userno: localStorage.getItem('userName'),
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      content: message,
      peer: selectedPeer
    }
    setmessages([...messages, msg]);
    ipcRenderer.send('SEND_MESSAGE', msg)
    console.log("LOCAL MESSAGE DATA",msg);
  }
  ipcRenderer.on('receive_message', (event, message) => {
    setmessages([...messages, message])
  });
  function SendSelectedPeer(peer) {
    setSelectedPeer(peer);
  }
  return (
    <main>
      <div className="chat">
        <ChatBar SendSelectedPeer={SendSelectedPeer} selectedPeer={selectedPeer} />
        <div className='chat_body'>
          {selectedPeer === "" ?
            (<ChatEmpty></ChatEmpty>) : (<div className='body_main'>
              <ChatBody peer={selectedPeer} messages={messages} />
              <ChatFooter addMessage={addMessage} />
            </div>)
          }
        </div>



      </div>
    </main>

  )

}

export default Chat
