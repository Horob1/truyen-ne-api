import mongoose from 'mongoose';
import Novel from './novelModel.js';
import populateMW from '../middleware/populateMW.js';

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Author must be have a name'],
    },
    birthday: Date,
    description: String,
    novels: [{ type: mongoose.Schema.ObjectId, ref: 'Novel' }],
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Author = mongoose.model('Author', authorSchema);

authorSchema.pre(
  /^find/,
  populateMW(next, 'novels', 'photo, description, name, debutDate')
);
export default Author;
