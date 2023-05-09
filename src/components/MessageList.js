import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material';

const MessageList = ({messages}) => {
  return (
    messages.length>0 ?
      (<List>
        {Array.isArray(messages)?
        messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText primary={message.author} secondary={message.message}></ListItemText>
          </ListItem>
        )):null}
      </List>) : null
  )
};

export default MessageList
