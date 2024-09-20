import React, {useState} from 'react';
import {Avatar, CircularProgress, Grid, IconButton, Stack, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {deepOrange} from '@mui/material/colors';
import {CommentBody} from '../../../../types';
import {useAppSelector} from '../../../../app/hooks';
import {selectCommentCreating, selectCreateError} from '../../сommentsSlice';

interface Props {
  username: string;
  onSubmit: (comment: CommentBody) => void;
  postId: string;
}

const CommentForm: React.FC<Props> = ({username, onSubmit, postId}) => {
  const isCreating = useAppSelector(selectCommentCreating);
  const error = useAppSelector(selectCreateError);
  const [state, setState] = useState<CommentBody>({
    text: '',
    post_id: postId,
  });

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(state);
    setState({
      text: '',
      post_id: postId,
    });
  };

  const getFieldError = () => {
    try {
      return error?.error;
    } catch {
      return undefined;
    }
  };


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
    >
      <Avatar
        sx={{
          width: 24,
          height: 24,
          bgcolor: deepOrange[200]
      }}>
        {username}
      </Avatar>
      <Grid
        container
        component="form"
        onSubmit={submitFormHandler}
        justifyContent="space-between"
      >
        <Grid item flexGrow={1} mr={1}>
          <TextField
            fullWidth
            name="text"
            size="medium"
            variant="standard"
            placeholder="Add a comment"
            value={state.text}
            onChange={inputChangeHandler}
            error={Boolean(getFieldError())}
            helperText={getFieldError()}
          />
        </Grid>
        <Grid item>
          <IconButton type="submit" disabled={isCreating}>
            {isCreating ? (
              <CircularProgress size={24} />
            ) : (
              <SendIcon color="info" />
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CommentForm;