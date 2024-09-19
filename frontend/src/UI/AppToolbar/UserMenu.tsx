import React, {useState} from 'react';
import {Button, Grid, Menu, MenuItem} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {User} from '../../types.ts';
import {useAppDispatch} from '../../app/hooks.ts';
import {logout} from '../../features/User/usersThunks.ts';
import {useNavigate} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
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
        <MenuItem onClick={() => navigate('/new-post')}>
          <PostAddIcon sx={{mr: 2}}/>
          Add new post
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{mr: 2}} />
          Logout
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;