import {Post, PostApi, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createPost, fetchOnePost, fetchPosts} from './postsThunks';

interface PostsState {
  posts: Post[];
  post: PostApi | null;
  fetchLoading: boolean;
  fetchOneLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: PostsState = {
  posts: [],
  post: null,
  fetchLoading: false,
  fetchOneLoading: false,
  createLoading: false,
  createError: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
        state.fetchLoading = false;
        state.posts = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(fetchOnePost.pending, (state) => {
        state.fetchOneLoading = true;
      })
      .addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
        state.fetchOneLoading = false;
        state.post = post;
      })
      .addCase(fetchOnePost.rejected, (state) => {
        state.fetchOneLoading = true;
      });

    builder
      .addCase(createPost.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPost.rejected, (state, {payload: error}) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
  selectors: {
    selectPosts: (state) => state.posts,
    selectPost: (state) => state.post,
    selectPostsLoading: (state) => state.fetchLoading,
    selectOnePostLoading: (state) => state.fetchOneLoading,
    selectCreatePostLoading: (state) => state.createLoading,
    selectCreatePostError: (state) => state.createError,
  },
});

export const postsReducer = postsSlice.reducer;

export const {
  selectPosts,
  selectPost,
  selectPostsLoading,
  selectOnePostLoading,
  selectCreatePostLoading,
  selectCreatePostError
} = postsSlice.selectors;