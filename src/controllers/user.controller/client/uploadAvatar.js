import { v2 as cloudinary } from 'cloudinary';
import User from '../../../models/userModel.js';

export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: result.secure_url },
      { new: true }
    );

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
