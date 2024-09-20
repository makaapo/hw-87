export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Post {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  title: string;
  image: string | null;
  datetime: string;
}

export interface PostApi extends Post {
  description: string | null;
}

export interface FormForum {
  title: string,
  description: string
  image: File | null;
}

export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  post: string;
  text: string;
}

export interface CommentMutation {
  post: string;
  text: string;
}

export type CommentBody = Omit<CommentMutation, 'post'>;

