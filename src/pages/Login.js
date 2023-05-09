import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron'
import { json } from 'body-parser';

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    ipcRenderer.send('REGISTER_USER', { name: userName })
    var data = {
      id: userName.length,
      author: userName,
      findPeer: userName,
    }
    ipcRenderer.send('FIND_USER', data)
    localStorage.setItem('userName', userName);    
  };
  ipcRenderer.on('register_user', (event, message) => {
    console.log("Login successful!");
    navigate('/chat');
  })
  ipcRenderer.on('find_user', (event, data) => {
    let msg = JSON.parse(data);
    localStorage.setItem('userIp', msg.address); 
    localStorage.setItem('userPort', msg.port);
  });
  return (
    <div className="username-form">
      <form >
        <div>
          <Box sx={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: '100vh',
          }} autoComplete='off'>
            <TextField id="outlined-basic" label="Username:" variant='outlined'
              placeholder='For example, alishobeiri'
              sx={{ width: '500px' }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)} />
            <Button variant="contained" color="primary" type="submit" sx={{ width: '500px' }} onClick={handleSubmit}>Submit</Button>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default Login
