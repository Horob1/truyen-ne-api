import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please tell us your username!'],
      unique: true,
      trim: true,
    },
    firsrName: {
      type: String,
      required: [true, 'Please tell us your first name!'],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    role: {
      type: String,
      enum: ['user', 'translator', 'admin'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      select: false,
      validate: [
        validator.isStrongPassword,
        'minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1!',
      ],
    },
    passwordConfirm: {
      type: String,
      minlength: 8,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not same!',
      },
    },
    createTime: {
        type: Date,
        default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User = mongoose.model('User', userSchema);

export default User;


