import React, {useState} from 'react';
import {Button, CircularProgress, Grid, TextField} from '@mui/material';
import {FormForum} from '../../../../types.ts';
import FileInput from '../../../../UI/FileInput/FileInput.tsx';
import {useAppSelector} from '../../../../app/hooks.ts';
import {selectCreatePostError, selectCreatePostLoading} from '../../postsSlice.ts';


interface Props {
  onSubmit: (posts: FormForum) => void;
}

const ForumForm: React.FC<Props> = ({onSubmit}) => {
  const isCreating = useAppSelector(selectCreatePostLoading);
  const error = useAppSelector(selectCreatePostError);
  const [state, setState] = useState<FormForum>({
    title: '',
    description: '',
    image: null,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...state});

  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Grid container direction="column" spacing={2} component="form" onSubmit={submitFormHandler}>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          label="Title"
          id="title"
          name="title"
          value={state.title}
          error={Boolean(getFieldError('title'))}
          helperText={getFieldError('title')}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          multiline
          minRows={3}
          label="Description"
          id="description"
          name="description"
          value={state.description}
          onChange={inputChangeHandler}
        />
      </Grid>
      <Grid item>
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
      </Grid>
      <Grid item>
        <Button
          disabled={isCreating}
          variant="contained"
          type="submit">
          {isCreating ? <CircularProgress size={24}/> : 'Create Post'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ForumForm;