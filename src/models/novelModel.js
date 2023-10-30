import mongoose from 'mongoose';

const novelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [True, 'Novel must have a name!'],
    },
    description: String,
    createDate: Date,
    debutName: Date,
    status: {
        type: String,
        enum: ['Bỏ dở', 'Chưa hoàn thành', 'Hoàn thành'],
        default: 'Chưa hoàn thành'
    },
    chapterNum: {
        type: Number,
        default: 0
    },
    photo: {
      type: String,
      default: '',
    },
    translator: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Novel = mongoose.model('Novel', novelSchema);

novelSchema.pre(/^find/, populateMW(next, 'translator', 'avatar, firsrName'));

export default Novel;
