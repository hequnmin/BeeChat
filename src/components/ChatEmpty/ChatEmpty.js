import { Card} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./index.css";

const ChatEmpty = () => {
    const navigate = useNavigate();

    const handleLeaveChat = () => { //离开聊天界面退出登录
        localStorage.removeItem('userName');
        navigate('/');
        window.location.reload();
    };

    return (
        <div className='container'>
            <div className="body__mainHeader">
                <p>Hangout</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    退出聊天
                </button>
            </div>
            <Card className='body_body'>
                <div className='chat_container'>
                    <div className='chat_icon'>
                    <ChatIcon sx={{ fontSize: 50 }}></ChatIcon>
                    </div>
                    
                    <div className='chat_line'>
                        请选择聊天对象
                    </div>
                </div>
            </Card>
        </div>
    )
};
export default ChatEmpty;