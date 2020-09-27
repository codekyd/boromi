import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Icon from '@material-ui/core/Icon';

const RequestAction =() => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRequestAction = () => {
  }

  return (
    <div>
      <Button aria-controls="loan-request-action" aria-haspopup="true" onClick={handleClick}>
      <Icon>
      <MoreVertIcon/>
      </Icon>
      </Button>
      <Menu
        id="loan-request-action"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleRequestAction} >Approve request</MenuItem>
        <MenuItem onClick={handleRequestAction}>Decline Request</MenuItem>
      </Menu>
    </div>
  );
}
export default RequestAction