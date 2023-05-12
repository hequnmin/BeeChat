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
            <Card sx={{ height: "90vh" }}>
                <div style={{margin:"20% 50%"}}>
                <ChatIcon sx={{ fontSize: 50 }}></ChatIcon>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    请选择聊天对象
                </Typography>
                </div>
            </Card>
        </div>
    )
};
export default ChatEmpty;