import React, { useState, useEffect } from 'react';
import OnlineList from './OnlineList'
import FindUser from '../components/FindUser'

const ChatBar = ({ socket, SendSelectedPeer ,selectedPeer}) => {
  const [peersList, setPeersList] = useState('');
  const [online, setOnline] = useState('false');
  useEffect(() => {
    socket.on('NEW_USER', (data) => setPeersList([...peersList, data]));
  }, [socket, peersList]);
  function findPeer(peer) {
    var data = {
      id: peer.length,
      author: localStorage.getItem('userName'),
      findPeer: peer,
    }
    socket.emit('FIND_USER', data);
  }
  function OnSelectedPeer(peer) {
    SendSelectedPeer(peer);
  }
  socket.on('PUNCH_SUCCESS', (data) => {
    setOnline(true);
  });
  return (
    <div className="chat__sidebar">
      <div className="chat_user">
      <div className="chat_username">
      {localStorage.getItem('userName')}
      </div>
      </div>

      <div>
        <div className="chat__addUser">
          <FindUser findPeer={findPeer} />
        </div>
        <h4 className="chat__header">在线用户</h4>
        <div className="chat__users">
          <div>
            <OnlineList
              peers={peersList} OnSelectedPeer={OnSelectedPeer} online={online} selectedPeer={selectedPeer }
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatBar;