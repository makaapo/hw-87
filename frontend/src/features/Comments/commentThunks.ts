import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {Comment, CommentMutation, GlobalError} from '../../types';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchByPost',
  async (postId) => {
    const {data: comments} = await axiosApi.get<Comment[]>('comments' + '?post=' + postId);
    return comments;
  },
);

export const submitComment = createAsyncThunk<void, CommentMutation, {state: RootState; rejectValue: GlobalError}>(
  'comments/create', async (comment, {getState, rejectWithValue}) => {
  try {
    const token = getState().users.user?.token;

    await axiosApi.post('comments', comment, {
      headers: {'Authorization': `Bearer ${token}`},
    });
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});
