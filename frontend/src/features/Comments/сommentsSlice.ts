import {Comment, GlobalError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchComments, submitComment} from './commentThunks';

interface CommentsState {
  comments: Comment[];
  fetchLoading: boolean;
  isCreating: boolean;
  createError: GlobalError | null;
}

const initialState: CommentsState = {
  comments: [],
  fetchLoading: false,
  isCreating: false,
  createError: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: comments }) => {
        state.fetchLoading = false;
        state.comments = comments;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(submitComment.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(submitComment.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(submitComment.rejected, (state, {payload: error}) => {
        state.isCreating = false;
        state.createError = error || null;
      });
  },
  selectors: {
    selectComments: (state) => state.comments,
    selectCommentsLoading: (state) => state.fetchLoading,
    selectCommentCreating: (state) => state.isCreating,
    selectCreateError: (state) => state.createError,
  },
});

export const commentsReducer = commentsSlice.reducer;

export const {
  selectComments,
  selectCommentsLoading,
  selectCommentCreating,
  selectCreateError,
} = commentsSlice.selectors;