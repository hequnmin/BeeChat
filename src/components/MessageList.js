import React from 'react'
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MessageList = ({messages}) => {
  return (
    messages.length>0 ?
      (<List>
        {Array.isArray(messages)?
        messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.userno}
              secondary={
                <>
                  {message.content.type === "image"?
                  (<img src={message.content.path} alt="" />)
                  :
                  (message.content.data)}                              
                </>
              }
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>             
              </ListItemText>
          </ListItem>
        )):null}
      </List>) : null
  )
};

export default MessageList
