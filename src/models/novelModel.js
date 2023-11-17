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
      default: Date.now,
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
    translator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [True, 'Novel must have a name!'],
    },
    author: { type: mongoose.Schema.ObjectId, ref: 'translator' },
    categories: [{ type: mongoose.Schema.ObjectId, ref: 'Category' }],
    reviews: [{ type: mongoose.Schema.ObjectId, ref: 'Review' }],
    reviewsQuan: {
      type: Number,
      default: 0,
    },
    rateAvg: {
      type: Number,
      default: 0,
    },
    rateSum: {
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
