import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'This chapter must have a name!'],
    },
    number: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: [true, 'his chapter must have content!'],
    },
    watch: {
      type: Number,
      default: 0,
    },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    translator: { type: mongoose.Schema.ObjectId, ref: 'User' },
    createTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
