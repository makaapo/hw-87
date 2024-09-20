import {Route, Routes} from 'react-router-dom';
import {Container, Typography} from '@mui/material';
import Home from './features/Home/Home';
import Register from './features/User/Register';
import Login from './features/User/Login';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import NewPost from './features/PostsContainer/NewPost/NewPost';
import OnePost from './features/PostsContainer/OnePost/OnePost';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="xl" component="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<OnePost />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="*" element={<Typography variant="h1">Not found</Typography>} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
