import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../User/usersSlice.ts';
import ForumForm from '../components/ForumForm/ForumForm.tsx';
import {createPost} from '../postsThunks.ts';
import {FormForum} from '../../../types.ts';


const NewPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" />;
  }

  const onFormSubmit = async (post: FormForum) => {
    await dispatch(createPost(post)).unwrap();
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