import User from '../../../models/userModel.js';
import avatarInitials from 'avatar-initials';
import { v2 as cloudinary } from 'cloudinary';
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
    console.log(user);
    res.status(201).json({
      status: 'Registration Successful',
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
