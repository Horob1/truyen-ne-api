import User from "../../models/userModel.js";
import catchAsync from "../../utils/catchAsync.js";

export const registerUser = catchAsync(async (req, res, next) => {
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
    status: "Registration Successful",
    data: {
      user,
    },
  });
});
