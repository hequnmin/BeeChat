import React from 'react';
import {Typography } from '@mui/material'

import MessageList from './MessageList'

const ChatBody = (props) => {

  return (
    <>
      <header className="chat__mainHeader">
        <div>{JSON.parse(props.peer).username}</div>
        <div>
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {JSON.parse(props.peer).address}:{JSON.parse(props.peer).port}
          </Typography>         
        </div>
      </header>
      <div className="message__container">
        <div className="message__chats">
          <MessageList messages={props.messages} />
        </div>
      </div>

    </>
  );
};

export default ChatBody;