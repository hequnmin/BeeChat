import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron'

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    ipcRenderer.send('REGISTER_USER', { name: userName })
    localStorage.setItem('userName', userName);
  };
  ipcRenderer.on('register_user', (event, message) => {
    let msg = JSON.parse(message);
    localStorage.setItem('userIp', msg.address);
    localStorage.setItem('userPort', msg.port);
    console.log("Login successful!");
    navigate('/chat');
  })
  // ipcRenderer.on('find_user', (event, data) => {
  //   let msg = JSON.parse(data);
  //   if (msg.result) {
  //     localStorage.setItem('userIp', msg.info.address);
  //     localStorage.setItem('userPort', msg.info.port);
  //   }
  // });
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
