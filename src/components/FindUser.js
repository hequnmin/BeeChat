import React, { useState } from 'react'
import { Paper, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
const FindUser = ({ findPeer ,searchTerm}) => {
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
                placeholder={searchTerm===2?("找不到该用户"):("Search...")}
                inputProps={{ 'aria-label': 'search peers' }}
                value={peerName}
                onChange={(e) => setPeerName(e.target.value)}
                
            />
        </Paper>
    );
}

export default FindUser
