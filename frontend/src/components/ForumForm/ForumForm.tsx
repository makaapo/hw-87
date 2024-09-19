import React, {useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {FormForum} from '../../types.ts';
import FileInput from '../../UI/FileInput/FileInput.tsx';


interface Props {
  onSubmit: (posts: FormForum) => void;
}

const ForumForm: React.FC<Props> = ({onSubmit}) => {
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
          onChange={inputChangeHandler}
          required
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{
            width: '100%',
          }}
          required
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
          variant="contained"
          type="submit">
          Create post
        </Button>
      </Grid>
    </Grid>
  );
};

export default ForumForm;