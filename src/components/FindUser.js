import React, { useState } from 'react'
// import { TextInput } from 'react-desktop/macOs'
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Padding } from '@mui/icons-material';
const FindUser = ({ findPeer }) => {
    const [peerName, setPeerName] = useState('');
    const handleFind = (e) => {
        e.preventDefault();
        findPeer(peerName);
        setPeerName('');
    };
    return (
        <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: "96%", margin: "2%" ,backgroundColor:'#FFFFFF'}}
            onSubmit={handleFind}
        >
            <SearchIcon color='primary' />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search peers' }}
                value={peerName}
                onChange={(e) => setPeerName(e.target.value)}
            />
        </Paper>
    );
}

export default FindUser
