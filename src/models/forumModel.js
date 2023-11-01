import mongoose from 'mongoose';

const forumSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'post in forum must have a name'],
    },
    content: {
      type: String,
      required: [true, 'post in forum must have a content'],
    },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    auth: { type: mongoose.Schema.ObjectId, ref: 'User' },
    chapter: { type: mongoose.Schema.ObjectId, ref: 'Chapter' },
    createTime: {
      type: Date,
      default: Date.now(),
    },
    isClose: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Forum = mongoose.Model('Forum', forumSchema);

export default Forum;