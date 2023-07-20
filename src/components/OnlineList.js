import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'

import { List, ListItemText, ListItemButton, Avatar, ListItemAvatar } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import DeleteIcon from '@mui/icons-material/Delete'
const OnlineList = ({ peers, OnSelectedPeer }) => {
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
            {/* <Divider variant="inset" component="li" sx={{ width: "100%", display: 'flex', margin: 0 }} /> */}
            <ListItemButton
              className='list_button'
              selected={selectedIndex === index}
              sx={{
                border: "1px solid #ffffff", borderRadius: "5px", width: "auto", backgroundColor: "#ffffff", margin: "5px 10px",alignItems:"flex-start"
              }}
              onClick={() => handleListItemClick(peer, index)}>
              <ListItemAvatar sx={{ width: 10,height:"100%" }}>
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
              {/* <ListItemAvatar sx={{ width: "12px", height: "12px" ,display:"flex",justifyContent:'flex-end'}}>
                  <DeleteIcon color="primary" sx={{ fontSize: 16 }}/>
                </ListItemAvatar> */}
            </ListItemButton>
          </div>

        )) : null}
    </List>
  )
}

export default OnlineList
