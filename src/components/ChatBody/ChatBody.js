import React from 'react';
import { Typography } from '@mui/material'

import MessageList from '../MessageList'
import ScrollToBottomContainer from '../../utils/ScrollToBottomContainer'
import "./index.css";

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
      {/* <div ref={scrollWrapperRef} className="message__container">
        <div className="message__chats" style={{ display: 'flex', flexDirection: 'column' }}>
          <MessageList messages={props.messages} selectPeer={props.peer } />
        </div>
      </div> */}
      <div className="message_container">
        <ScrollToBottomContainer>
          <div className="message_chats" style={{ display: 'flex', flexDirection: 'column' }}>
            <MessageList messages={props.messages} selectPeer={props.peer} />
          </div>
        </ScrollToBottomContainer>
      </div>
    </>
  );
};

export default ChatBody;