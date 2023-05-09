import { Card, CardContent, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChatEmpty = () => {
    const navigate = useNavigate();

    const handleLeaveChat = () => { //离开聊天界面退出登录
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    return (
        <div>
            <div className="chat__mainHeader">
                <p>Hangout</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    退出聊天
                </button>
            </div>
            <Card className="message__container" sx={{height:"90vh"}}>
                    <ChatIcon></ChatIcon>
                    <Typography>请选择聊天对象</Typography>
            </Card>
        </div>
    )
};
export default ChatEmpty;