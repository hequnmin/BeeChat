import React, { useState } from 'react';
import { ipcRenderer } from 'electron'
import Avatar from '@mui/material/Avatar';
import OnlineList from '../OnlineList'
import FindUser from '../FindUser/FindUser'
import ScrollToBottomContainer from '../../utils/ScrollToBottomContainer'

import './index.css'
const ChatBar = ({ SendSelectedPeer, selectedPeer }) => {
  const [peersList, setPeersList] = useState('');
  const [searchTerm, setSearchTerm] = useState('0');

  // useEffect(() => {
  //   ipcRenderer.on('find_user', (data) => setPeersList([...peersList, data]));
  // }, [peersList]);
  function findPeer(peer) {
    var data = {
      id: peer.length,
      author: localStorage.getItem('userName'),
      findPeer: peer,
    }
    ipcRenderer.send('FIND_USER', data)

  }
  ipcRenderer.on('find_user', (event, data) => {
    const msg = JSON.parse(data);
    if (msg.result) {
      setPeersList([...peersList, msg.info])
      setSearchTerm('1')
    }
    else {
      setSearchTerm('2')
    }
  });
  function OnSelectedPeer(peer) {
    SendSelectedPeer(peer);
  }
  // ipcRenderer.on('PUNCH_SUCCESS', () => {
  //   setOnline(true);
  // });
  const handleFindResult = () => {
    if (searchTerm === '1') {
      // return <p style={{ margin: "0 25%" }}>{ peersList[peersList.length-1].userno}</p>
      return <p> </p>
    }
    else if (searchTerm === '2') {
      return <p style={{ margin: "0 25%" }}>找不到用户！</p>
    }
    else {
      return <p> </p>
    }
  }
  return (
    <div className="chat__sidebar">
      <div className='sidebar_user'>
        <div className='user_container'>
          <div className='user_avatar'>
            <Avatar>{localStorage.getItem('userName').substring(0, 1)}</Avatar>
          </div>
          <div className='user_info'>
            <span>{localStorage.getItem('userName')}</span>
            <p>{localStorage.getItem('userIp')}</p>
          </div>
        </div>
      </div>
      <div className='sidebar_peers'>
        <div className="sidebar_addUser">
          <FindUser findPeer={findPeer} searchTerm={searchTerm} />
        </div>
        <div style={{ height: "10px" }}>{handleFindResult()}</div>
        {/* <h4 className="sidebar__header">在线用户</h4> */}
        <div className="sidebar_users">
          <ScrollToBottomContainer>
            <div style={{ height: "100%" }}>
              <OnlineList
                peers={peersList} OnSelectedPeer={OnSelectedPeer}
              />
            </div>
          </ScrollToBottomContainer>

        </div>

      </div>
    </div>
  );
};

export default ChatBar;