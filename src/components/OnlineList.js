import React from 'react'
import { List, ListItemText, ListItemButton, Divider,Avatar,ListItemAvatar,Typography} from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const OnlineList = ({ peers, OnSelectedPeer, online ,selectedPeer}) => {
  const handleListItemClick = (peer) => {
    OnSelectedPeer(peer);
  };
  return (
    <List className="online-list">
      {Array.isArray(peers) ?
        peers.map((peer, index) => (
          <div
            key={index}
            className="online-list-item"
            style={{
              width: "100%"
            }}>
            <Divider variant="inset" component="li" sx={{ width: "100%", display: 'flex', margin: 0 }} />
            <ListItemButton
              onClick={() => handleListItemClick(peer)}>
              <ListItemAvatar sx={{width:10}}>
            <Avatar>{JSON.parse(peer).username.substring(0,1)}</Avatar>
          </ListItemAvatar>
              <ListItemText color="secondary" size="medium"
                primary={JSON.parse(peer).username}
                secondary={
                  <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {JSON.parse(peer).address}
                  </Typography>
                  :{JSON.parse(peer).port}
                </React.Fragment>
              }>
                
              </ListItemText>
              {/* <FiberManualRecordIcon color='#00FF00'/> */}
              {peer === selectedPeer  ?
                <FiberManualRecordIcon /> : null}
            </ListItemButton>
          </div>

        )) : null}
    </List>
  )
}

export default OnlineList
