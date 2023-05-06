// import './App.css';
import React, { Component } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';

import Login from './pages/Login'
import Chat from './pages/Chat'

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

class App extends Component {

  state = {
    currentUsername: null,
    currentId: null,
    // socket: io('http://localhost:8080'),
    messages: [],
    peersList: []
  }
  componentDidMount() {

  }
  onUsernameSubmitted = username => {
    this.setState({
      name: username,
      currentId: Math.random(),
      currentScreen: "chat"
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <HashRouter>
          <Routes>
            <Route exact path="/" element={
              <Login />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>

    )
  }
}

export default App
