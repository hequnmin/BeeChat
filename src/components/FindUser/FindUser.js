import React, { useState } from 'react'
import { Paper, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import "./index.css";

const FindUser = ({ findPeer, searchTerm }) => {
    const [peerName, setPeerName] = useState('');
    const handleFind = (e) => {
        e.preventDefault();
        findPeer(peerName);
        setPeerName('');
    };

    return (
        <div>
            <Paper
                component="form"
                sx={{ display: 'flex', alignItems: 'center', width: "96%", margin: "2%", backgroundColor: '#FFFFFF' ,border: "1px solid #ced4da"}}
                onSubmit={handleFind}
            >
                <SearchIcon color='primary' />
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={"Search..."}
                    inputProps={{ 'aria-label': 'search peers' }}
                    className='input_control'
                    value={peerName}
                    onChange={(e) => setPeerName(e.target.value)}

                />
            </Paper>
            
        </div>

    );
}

export default FindUser
