import mongoose, {HydratedDocument, Types} from 'mongoose';
import User from './User';
import {PostFields} from '../types';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is a required field'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  description: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<PostFields>) {
        return this.description || this.image;
      },
      message: 'Description or image must be present',
    },
  },
  image: {
    type: String,
    validate: {
      validator: function (this: HydratedDocument<PostFields>) {
        return this.description || this.image;
      },
      message: 'Image or description must be present',
    },
  },
  datetime: Date,
});

const Post = mongoose.model('Post', PostSchema);

export default Post;