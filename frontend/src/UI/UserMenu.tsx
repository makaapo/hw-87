import React, {useState} from 'react';
import {Button, Grid, Menu, MenuItem} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import {User} from '../types.ts';
import {useAppDispatch} from '../app/hooks.ts';
import {logout} from '../features/User/usersThunks.ts';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen= Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.username}!
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleLogout}>
          <RestoreIcon sx={{mr: 2}} />
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;