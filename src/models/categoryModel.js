import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    num: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
