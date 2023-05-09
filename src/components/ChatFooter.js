import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { Button, Divider, IconButton, TextField } from '@mui/material';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';

const ChatFooter = ({ addMessage }) => {
    const [message, setmessage] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        console.log({ userName: localStorage.getItem('userName'), message });
        addMessage(message);
        setmessage('');
    }

    const handleOpenFileDialog = async () => {
        ipcRenderer.send('open_dialog');
    }

    ipcRenderer.on('selectedFile', (event, filePath) => {
        let data = {
            data_type: "file",
            message:filePath
        }
        setmessage(data);        
    })
    return (
        <div className="chat__footer">
            <Divider />
            <form sx={{ height: 24, width: 24 }}>
                <IconButton onClick={handleOpenFileDialog} sx={{ height: 24, width: 24 }}>
                    <FolderOpenOutlinedIcon />
                </IconButton>
            </form>
            <form className="form" onSubmit={onSubmit}>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    placeholder="编写消息"
                    variant="standard"
                    value={message.message}
                    onChange={(e) => setmessage({data_type:"text",message:e.target.value})}
                />
                <Button className="sendBtn">发送</Button>
            </form>
        </div>
    );

}

export default ChatFooter;