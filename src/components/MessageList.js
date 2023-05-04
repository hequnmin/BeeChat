import React from 'react'
import { List, ListItem, ListItemText } from '@mui/material';

const MessageList= (messages)=>{
  return (
    <List>
      {messages.messages.messages.map((message, index) => (
        <ListItem key={index}>
        <ListItemText primary={message.author} secondary={message.message}></ListItemText>
      </ListItem>
      ))}
    </List>
  )
};

export default MessageList
