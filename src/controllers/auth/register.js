import User from '../../models/userModel.js';
import catchAsync from '../../utils/catchAsync';
import generateAccessToken from './generateAccessToken.js';
import generateRefreshToken from './generateRefreshToken.js';

const register = catchAsync(async (req, res, next) => {
  const { username, firstName, lastName, email, password, passwordConfirm } =
    req.body;

  const user = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  res.status(201).json({
    status: 'Registration Successful',
    data: {
      user,
    },
  });
});
