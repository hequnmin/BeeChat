import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer } from 'electron'

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    ipcRenderer.send('REGISTER_USER', {name: userName})
  };
  ipcRenderer.on('register_user', (event, message) => {
    console.log("Login successful!");
    navigate('/chat');
  })
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
