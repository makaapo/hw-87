import express from 'express';
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Comment from "../models/Comment";
import Post from '../models/Post';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    if (!req.query.post_id) {
      res.status(400).send({error: "Post_ID is wrong"});
    }

    const post = await Post.findById(req.query.post_id);

    if (!post) {
      return res.status(404).send({error: "Post not found"});
    }

    const comments = await Comment.find({post: req.query.post_id}).populate('user', 'username');
    res.send(comments.reverse());
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', auth,  async (req: RequestWithUser, res, next) => {

  if (!req.query.post_id) {
    res.status(400).send({error: "Text and Post_ID the request"});
  }

  const postID = await Post.findById(req.query.post_id);

  if (!postID) {
    return res.status(404).send({error: "Post not found"});
  }

  try {
    const commentsMutation = {
      user: req.user?._id,
      post: req.query.post_id,
      text: req.body.text,
    };

    const comment = new Comment(commentsMutation);

    await comment.save();
    res.send(comment);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default commentsRouter