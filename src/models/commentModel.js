import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    forum: {type: mongoose.Schema.ObjectId, ref: 'Forum'},
    chapter: { type: mongoose.Schema.ObjectId, ref: 'Chapter' },
    createTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
