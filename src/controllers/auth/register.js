
import User from '../../models/userModel.js';
import catchAsync from '../../utils/catchAsync';

const register = catchAsync(async (req, res, next) => {
  const { username, firstName, lastName, email, password, passwordConfirm } =
    req.body;

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  await user.save();

  res.status(201).json({

    status: 'Registration Successful',

  });
});
