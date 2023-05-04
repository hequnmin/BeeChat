import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// class UsernameForm extends Component { 
//   constructor(props) {
//     super(props)
//     this.state = {
//       username: '',
//       redirectToReferrer: false,
//       socket: props.socket
//     }
//   }

//   handleSubmit = e => {
//     e.preventDefault()    
//     console.log("Login successful!");
//     this.props.handleSubmit(this.state.username);
//       // this.props.socket.on('REGISTER_USER', function (data) {
//       //   console.log("Login successful!");
//       //   useNavigate('/chat');
//       // });
//   }

//   handleChange = e => {
//     this.setState({ username: e.target.value })
//   }

//   render() {
//     return (
//       <div className="username-form">
//         <form >
//           <div>
//             <Box sx={{
//               display: 'flex', flexDirection: 'column', alignItems: 'center',
//               justifyContent: 'center', height: '100vh',
//             }} autoComplete='off'>
//               <TextField id="outlined-basic" label="Username:" variant='outlined'
//                 placeholder='For example, alishobeiri'
//                 sx={{ width: '500px' }}
//                 value={this.state.username}
//                 onChange={this.handleChange} />
//               <Button variant="contained" color="primary" type="submit" sx={{ width: '500px' }} onClick={this.handleSubmit}>Submit</Button>
//             </Box>
//           </div>
//         </form>
//       </div>
//     )
//   }
// }
const Login = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login successful!");
    localStorage.setItem('userName', userName);
    props.socket.emit('REGISTER_USER', {
      name: userName,     
    });
    navigate('/chat');
  };

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
