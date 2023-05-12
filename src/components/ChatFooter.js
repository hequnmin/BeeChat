import React, { useState } from 'react';
import { ipcRenderer } from 'electron';
import { Button, Divider, IconButton, TextField } from '@mui/material';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import PanoramaOutlinedIcon from '@mui/icons-material/PanoramaOutlined';

const ChatFooter = ({ addMessage }) => {
    const [message, setmessage] = useState('');
    const [imageUrl, setImageUrl] = useState("");

    function onSubmit(e) {
        // e.preventDefault();
        console.log({ userName: localStorage.getItem('userName'), message });
        addMessage(message);
        setmessage({ type: "", data: "" })
        // setmessage('');
        setImageUrl('');
    }

    const handleOpenFileDialog = async () => {
        ipcRenderer.send('open_dialog');
    }
    const handleInsertImage = (event) => {
        setImageUrl(event.target.files[0].path);
        setmessage({
            type: "image",
            path: event.target.files[0].path,
            image_name: event.target.files[0].name,
            data: ""
        });
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          // 按下 Enter 键并且没有按下 Shift 键，发送表单
          event.preventDefault(); // 阻止默认的表单提交行为
        onSubmit();
        }
      };
    ipcRenderer.on('selectedFile', (event, file) => {
        let message;
        switch (file.info.ext) {
            case ".jpg":
                message = {
                    type: "image",
                    path: file.fullname,
                    image_name: file.info.name,
                    data: ""
                }
                break;
            default: break;
        }
        setmessage(message);
    })
    return (
        <div className="chat__footer">
            <Divider />
            <form sx={{ height: 32, width: 32 }}>
                <IconButton onClick={handleOpenFileDialog} sx={{ height: 24, width: 24 }}>
                    <FolderOpenOutlinedIcon />
                </IconButton>
                <IconButton sx={{ height: 32, width: 32, marginLeft: 2 }}>
                    <Button component="label" startIcon={<PanoramaOutlinedIcon />} sx={{ height: 32, width: 32, minWidth: 32, marginLeft: 0 }}>
                        <input
                            type="file"
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={handleInsertImage}
                        />
                    </Button>

                </IconButton>
            </form>
            <form className="form" onSubmit={onSubmit}>
                <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    variant="standard"
                    value={message.data}
                    onChange={(e) => setmessage({ type: "text", data: e.target.value })}
                    onKeyDown={handleKeyPress}
                />
                <img
                    src={imageUrl}
                    alt=""
                    style={{ height: "auto", width: 100, marginRight: 10 }}
                />
                <Button className="sendBtn" onClick={onSubmit}>发送</Button>
            </form>
        </div>
    );

}

export default ChatFooter;