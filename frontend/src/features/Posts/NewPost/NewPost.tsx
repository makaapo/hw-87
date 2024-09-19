import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../User/usersSlice.ts';
import ForumForm from '../../../components/ForumForm/ForumForm.tsx';


const NewPost: React.FC = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  const onFormSubmit = () => {
    navigate('/');
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        mb={6}
        mt={3}
        textAlign="center"
      >
        Create new post
      </Typography>
      <ForumForm onSubmit={onFormSubmit}/>
    </Box>
  );
};

export default NewPost;