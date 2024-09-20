import express from 'express';
import mongoose from "mongoose";
import auth, {RequestWithUser} from '../middleware/auth';
import Post from "../models/Post";
import {imagesUpload} from "../multer";

const postRouter = express.Router();

postRouter.get('/', async (req, res, next) => {
  try {
    const post = await Post.find().populate('user', 'username').sort({datetime: -1});
    return res.send(post);
  } catch (e) {
    next(e);
  }
});

postRouter.get('/:id', async (req, res, next) => {
  try {
    if (!req.params.id) {
      res.status(400).send({error: 'Wrong Id!'});
    }

    const post = await Post.findById(req.params.id).populate('user', 'username');
    return res.send(post);
  } catch (e) {
    next(e);
  }
});

postRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    const postMutation = new Post({
      user: req.user?._id,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
      datetime: new Date().toISOString(),
      image: req.file ? req.file.filename : null,
    });

    const post = new Post(postMutation);
    await post.save();

    res.send(post);

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }
    next(e);
  }
});

export default postRouter;