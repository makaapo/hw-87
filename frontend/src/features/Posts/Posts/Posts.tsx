import React, { useEffect } from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectPosts, selectPostsLoading} from '../postsSlice.ts';
import {fetchPosts} from '../postsThunks.ts';
import PostCard from '../components/PostCard/PostCard.tsx';

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <>
      {loading && <CircularProgress />}
      <Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            borderBottom: '1px solid #eee',
            mb: '24px',
            pb: 2,
          }}
        >
          Recent posts
        </Typography>
        {posts.length > 0 &&
          posts.map((post) => <PostCard key={post._id} post={post} />)}
      </Box>
    </>
  );
};

export default Posts;