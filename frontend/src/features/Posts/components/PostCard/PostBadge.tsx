import {Stack} from '@mui/material';
import React from 'react';
import ForumIcon from '@mui/icons-material/Forum';

const PostBadge: React.FC = () => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      px={1}
      py={0.4}
      sx={{
        bgcolor: 'coral',
        borderRadius: 4,
        color: 'white',
        display: 'inline-flex',
      }}
    >
      <ForumIcon color="inherit" sx={{fontSize: 50}} />
    </Stack>
  );
};

export default PostBadge;