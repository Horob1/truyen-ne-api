import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    content: String,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    novel: { type: mongoose.Schema.ObjectId, ref: 'Novel' },
    rate: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
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

const Review = mongoose.model('Review', reviewSchema);

export default Review;
