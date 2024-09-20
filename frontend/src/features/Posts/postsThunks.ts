import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {FormForum, Post, PostApi, ValidationError} from '../../types';
import {isAxiosError} from 'axios';
import {RootState} from '../../app/store';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    const {data: post} = await axiosApi.get<Post[]>('posts');
    return post;
  },
);

export const fetchOnePost = createAsyncThunk<PostApi, string>(
  'posts/fetchOne',
  async (postId) => {
    const {data: postApi} = await axiosApi.get<PostApi>(
      `posts/${postId}`,
    );
    return postApi;
  },
);

export const createPost = createAsyncThunk<void, FormForum, {state: RootState; rejectValue: ValidationError}
>('posts/createPost', async (post, {getState, rejectWithValue}) => {
  try {
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('title', post.title);

    if (post.description) {
      formData.append('description', post.description);
    }

    if (post.image) {
      formData.append('image', post.image);
    }

    await axiosApi.post('posts', formData, {
      headers: {'Authorization': `Bearer ${token}`},
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});