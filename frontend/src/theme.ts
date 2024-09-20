import { createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
  palette: {
    secondary: {
      light: '#ff616f',
      main: '#f50057',
      dark: '#bb002f',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    body1: {
      fontSize: '1rem',
      color: '#333',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;