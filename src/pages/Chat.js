import React, { useEffect, useState } from 'react'
import { ipcRenderer } from 'electron'

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
    var data = {
      id: message.length,
      author: localStorage.getItem('userName'),
      message: message,
      peer: JSON.parse(selectedPeer)
    }
    setmessages([...messages, data]);
    ipcRenderer.send('SEND_MESSAGE', data)
    console.log("LOCAL MESSAGE DATA");
  }
  ipcRenderer.on('receive_message', (event, data) => {
    setmessages([...messages, data])
  });
  function SendSelectedPeer(peer) {
    setSelectedPeer(peer);
  }
  return (
    <main>
      <div className="chat">
        <aside className="chat__sidebar">
          <ChatBar SendSelectedPeer={SendSelectedPeer} selectedPeer={selectedPeer} />
        </aside>
        <div>
          {selectedPeer === "" ?
            (<ChatEmpty></ChatEmpty>) : (<div className='chat_main'>
              <ChatBody peer={ selectedPeer} messages={messages} />
              <ChatFooter addMessage={addMessage} />
            </div>)
          }
        </div>



      </div>
    </main>

  )

}

export default Chat
