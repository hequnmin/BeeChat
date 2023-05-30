import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

import { List, ListItemText, ListItemButton, Divider, Avatar, ListItemAvatar} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const OnlineList = ({ peers, OnSelectedPeer}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [online, setOnline] = useState({});
  const heartbeatTimeout = 5000;
  const handleListItemClick = (peer, index) => {
    OnSelectedPeer(peer);
    setSelectedIndex(index);
  };
  useEffect(() => {
    const handleHeartbeat = (event, msg) => {
      // 更新好友的在线状态
      setOnline((prevStatus) => ({
        ...prevStatus,
        [msg.userid]: true,
      }));
      setTimeout(() => {
        setOnline((prevStatus) => ({
          ...prevStatus,
          [msg.userid]: false,
        }));
      }, heartbeatTimeout); 
    };
    
    ipcRenderer.on('heart_beat', handleHeartbeat);
    // 在组件卸载时取消注册事件监听器
    return () => {
      ipcRenderer.off('heart_beat', handleHeartbeat);
    };
  }, []);
  return (
    <List className="online-list">
      {Array.isArray(peers) ?
        peers.map((peer, index) => (
          <div
            key={index}
            className="online-list-item"
            style={{
              width: "100%"
            }}>
            <Divider variant="inset" component="li" sx={{ width: "100%", display: 'flex', margin: 0 }} />
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(peer, index)}>
              <ListItemAvatar sx={{ width: 10 }}>
                <Avatar>{(peer).userno.substring(0, 1)}</Avatar>
              </ListItemAvatar>
              <ListItemText color="secondary" size="medium"
                primary={(peer).userno}
                secondary=              
                {online[peer.userid] ? (<span><FiberManualRecordIcon sx={{ fontSize: 15, color: '#198754' }} /><span>在线</span></span>)
                  : (
                    <span><FiberManualRecordIcon sx={{ fontSize: 15, color: '#C3C3C3' }} /><span>离线</span></span>
                  )}
              >

              </ListItemText>
            </ListItemButton>
          </div>

        )) : null}
    </List>
  )
}

export default OnlineList
