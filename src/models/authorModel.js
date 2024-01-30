import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Author must have a name'],
    },
    birthday: Date,
    description: String,
    avatar: {
      type: String,
      default: function () {
        return process.env.AVT_DF_URL;
      },
    },
    slugAuthor: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Author = mongoose.model('Author', authorSchema);

export default Author;
