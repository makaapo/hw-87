import React, { useCallback, useEffect } from 'react';
import {Box, CircularProgress} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../User/usersSlice';
import {selectOnePostLoading, selectPost} from '../postsSlice';
import {fetchOnePost} from '../postsThunks';
import PostPage from './PostPage';
import CommentForm from '../../Comments/components/CommentForm/CommentForm';
import {CommentBody, CommentMutation} from '../../../types';

const OnePost: React.FC = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOnePostLoading);

  const fetchPost = useCallback(async () => {
    await dispatch(fetchOnePost(id)).unwrap();
  }, []);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const onSubmitComment = async (comment: CommentBody) => {
    const newComment: CommentMutation = {
      post: id,
      text: comment.text,
    };
    console.log(newComment);
  };

  return (
    <>
      <Box mb={6}>
        {loading && <CircularProgress />}
        {post && <PostPage post={post} />}
      </Box>
      <Box mb={4}>
        {user && (
          <CommentForm
            username={user.username.charAt(0)}
            onSubmit={onSubmitComment}
          />
        )}
      </Box>
    </>
  );
};

export default OnePost;