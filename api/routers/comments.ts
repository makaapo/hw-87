import express from 'express';
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";
import Comment from "../models/Comment";
import Post from '../models/Post';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
  try {
    if (!req.query.post) {
      return res.status(400).send({error: "Post_ID is wrong"});
    }

    const post = await Post.findById(req.query.post);

    if (!post) {
      return res.status(404).send({error: "Post not found"});
    }

    const comments = await Comment.find({post: req.query.post}).populate('user', 'username');
    res.send(comments.reverse());
  } catch (e) {
    next(e);
  }
});

commentsRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.body.post_id || !req.body.text) {
      return res.status(400).send({error: "Text and POST ID are required" });
    }

    const post = await Post.findById(req.body.post_id);
    if (!post) {
      return res.status(404).send({error: "Post not found" });
    }

    const comment = new Comment({
      user: req.user?._id,
      post: req.body.post_id,
      text: req.body.text,
    });

    await comment.save();

    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});


export default commentsRouter