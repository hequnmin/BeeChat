import React from 'react';
import {Typography } from '@mui/material'

import MessageList from './MessageList'

const ChatBody = (props) => {

  return (
    <>
      <header className="body__mainHeader">
        <div>{props.peer.username}</div>
        <div>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {props.peer.address}:{props.peer.port}
          </Typography>         
        </div>
      </header>
      <div className="message__container">
        <div className="message__chats" style={{ display: 'flex', flexDirection: 'column' }}>
          <MessageList messages={props.messages} selectPeer={props.peer } />
        </div>
      </div>

    </>
  );
};

export default ChatBody;