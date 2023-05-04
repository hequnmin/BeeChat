import React from 'react'
import { List, ListItemText, ListItemButton, Divider} from '@mui/material';
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
              width: 150
            }}>
            <Divider variant="inset" component="li" sx={{ width: 150, display: 'flex', margin: 0 }} />
            <ListItemButton
              onClick={() => handleListItemClick(peer)}>
              <ListItemText color="secondary" size="medium">
                {JSON.parse(peer).username}
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
