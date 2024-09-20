import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import UserMenu from './UserMenu';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from '../../features/User/usersSlice';
import AnonymousMenu from './AnonymousMenu';


const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{mb: 2}} color="secondary">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
              <StyledLink to="/">
                <ForumIcon sx={{mr: 2}} />
                Forum
              </StyledLink>
            </Typography>
          </Grid>
          {user ? (<UserMenu user={user}/>) : (<AnonymousMenu/>)}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;