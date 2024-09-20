import React, { useCallback, useEffect } from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';
import { useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../User/usersSlice';
import {fetchOnePost} from '../postsThunks';
import {fetchComments, submitComment} from '../../Comments/commentThunks';
import {selectOnePostLoading, selectPost} from '../postsSlice';
import {selectComments} from '../../Comments/сommentsSlice';
import {CommentBody, CommentMutation} from '../../../types';
import PostPage from './PostPage';
import CommentForm from '../../Comments/components/CommentForm/CommentForm';
import CommentCard from '../../Comments/components/CommentCard/CommentCard';


const onePost: React.FC = () => {
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const post = useAppSelector(selectPost);
  const loading = useAppSelector(selectOnePostLoading);
  const comments = useAppSelector(selectComments);

  const fetchPost = useCallback(async () => {
    await dispatch(fetchOnePost(id)).unwrap();
    await dispatch(fetchComments(id)).unwrap();
  }, []);

  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

  const onSubmitComment = async (comment: CommentBody) => {
    const newComment: CommentMutation = {
      post_id: id,
      text: comment.text,
    };
    await dispatch(submitComment(newComment)).unwrap();
    await dispatch(fetchComments(id)).unwrap();
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
            postId={id}
          />
        )}
      </Box>

      <Typography variant="subtitle1" gutterBottom mb={3}>
        {comments.length > 0 ? 'Comments' : 'No comments yet'}
      </Typography>

      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          user={comment.user.username}
          text={comment.text}
        />
      ))}
    </>
  );
};

export default onePost;