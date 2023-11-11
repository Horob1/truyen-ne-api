import User from "../../models/userModel.js";

export const register = async (req, res) => {
  try {
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
      status: "Registration Successful",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
