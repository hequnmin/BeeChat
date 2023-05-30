import React from 'react'
import { List, ListItem, ListItemText, Box} from '@mui/material';

const MessageList = ({ messages, selectPeer }) => {
  return (
    <List style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.isArray(messages) ?
        messages.map((message, index) => (
          selectPeer === message.peer || selectPeer.userno === message.userno ?
            (
              <ListItem key={index}
              // className={message.userno === JSON.parse(selectPeer).username ? 'normal' : 'reverse'}
              >
                <Box                 
                  alignItems="center"
                  maxWidth="60%"
                  width='fit-content'
                  marginY={1}
                >
                  <div className='message_list'>                  
                    <span style={{ color: '#607EAA', width:'fit-content'}}>{message.userno}</span>
                    <i style={{ color: '#aad', opacity: '0.8', fontSize: 'small', marginLeft: '15px' }}>{message.time}</i>
                  </div>
                  <Box
                    bgcolor={message.userno === (selectPeer).userno ? '#F5F5F5' : '#E0F2F1'}
                    borderRadius="10px"
                    padding={1}
                    width='fit-content'
                  >
                    <ListItemText
                      secondary={
                        <>
                          {message.content.type === "image" ?
                            (<img src={message.content.path} alt="" />)
                            :
                            (message.content.data)}
                        </>
                      }
                      style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                    </ListItemText>
                  </Box>
                </Box>
              </ListItem>

            ) : null
        )) : null}
    </List>
  )
};

export default MessageList
