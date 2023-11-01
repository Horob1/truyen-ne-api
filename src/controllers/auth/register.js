<<<<<<< HEAD
import User from '../../models/userModel.js';
import catchAsync from '../../utils/catchAsync';

const register = catchAsync(async (req, res, next) => {
  const { username, firstName, lastName, email, password, passwordConfirm } =
    req.body;

  const user = new User({
=======
import User from "../../models/userModel.js";
import catchAsync from "../../utils/catchAsync.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { username, firstName, lastName, email, password, passwordConfirm } =
    req.body;

  const user = await User.create({
>>>>>>> 146bce480c8f213f5676774933e96f8bb524a136
    username,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

<<<<<<< HEAD
  await user.save();

  res.status(201).json({
    status: 'Registration Successful',
=======
  res.status(201).json({
    status: "Registration Successful",
>>>>>>> 146bce480c8f213f5676774933e96f8bb524a136
    data: {
      user,
    },
  });
});
