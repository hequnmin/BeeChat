import React, { useState } from 'react';
import { ipcRenderer } from 'electron'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import OnlineList from './OnlineList'
import FindUser from '../components/FindUser'

const ChatBar = ({ SendSelectedPeer, selectedPeer }) => {
  const [peersList, setPeersList] = useState('');
  const [online, setOnline] = useState('false');
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
    setPeersList([...peersList, data])
  });
  function OnSelectedPeer(peer) {
    SendSelectedPeer(peer);
  }
  ipcRenderer.on('PUNCH_SUCCESS', () => {
    setOnline(true);
  });
  return (
    <div className="chat__sidebar">
      {/* <div className="chat_user">
      <div className="chat_username">
      {localStorage.getItem('userName')}
      </div>
      </div> */}
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{width:10}}>
            <Avatar>{localStorage.getItem('userName').substring(0,1)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={localStorage.getItem('userName')}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {localStorage.getItem('userIp')}
                </Typography>
                :{localStorage.getItem('userPort')}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
      <div>
        <div className="chat__addUser">
          <FindUser findPeer={findPeer} />
        </div>
        <h4 className="chat__header">在线用户</h4>
        <div className="chat__users">
          <div>
            <OnlineList
              peers={peersList} OnSelectedPeer={OnSelectedPeer} online={online} selectedPeer={selectedPeer}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatBar;