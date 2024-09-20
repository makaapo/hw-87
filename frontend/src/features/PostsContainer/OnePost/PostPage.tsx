import React from 'react';
import dayjs from 'dayjs';
import { Avatar, Box, Typography } from '@mui/material';
import {PostApi} from '../../../types';
import {API_URL} from '../../../constans';
import PostBadge from '../components/PostCard/PostBadge';

interface Props {
  post: PostApi;
}

const PostPage: React.FC<Props> = ({ post }) => {
  const postImage = API_URL + '/' + post.image;
  const date = dayjs(post.datetime).format('dddd, HH:mm:ss');

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 4
      }}>
        <Avatar sx={{
          width: 28,
          height: 28,
          mr: 1
        }}>
          {post.user.username.charAt(0)}
        </Avatar>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            sx={{flexGrow: 1}}
            variant="subtitle1"
            fontWeight="bolder"
          >
            {post.user.username}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary">
            {date}
          </Typography>
        </Box>
      </Box>
      {!post.image && <PostBadge />}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom mb={6}
        mt={3}>
        {post.title}
      </Typography>
      {post.description && (
        <Box>
          <Typography
            variant="body1"
            gutterBottom mb={4}>
            {post.description}
          </Typography>
        </Box>
      )}
      {post.image && (
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: '12px'
        }}>
          <img
            src={postImage}
            alt={post.title}
            style={{
              width: 'auto',
              height: '100%',
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PostPage;