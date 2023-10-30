import mongoose from 'mongoose';

const novelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [True, 'Novel must have a name!'],
    },
    description: {
      type: String,
      default: 'Chưa có mô tả!',
    },
    createTime: {
      type: Date,
      default: Date.now(),
    },
    debutDate: Date,
    status: {
      type: String,
      enum: ['Bỏ dở', 'Chưa hoàn thành', 'Hoàn thành'],
      default: 'Chưa hoàn thành',
    },
    progress: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: '',
    },
    translator: { type: mongoose.Schema.ObjectId, ref: 'User' },
    author: { type: mongoose.Schema.ObjectId, ref: 'Author' },
    categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
    reviews: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }],
    rateAvg: {
      type: Number,
      default: 0,
    },
    watch: {
      type: Number,
      default: 0,
    },
    love: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Novel = mongoose.model('Novel', novelSchema);

export default Novel;
