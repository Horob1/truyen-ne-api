import { v2 as cloudinary } from 'cloudinary';
import User from '../../../models/userModel.js';
import fs from 'fs';

export const uploadAvatar = async (req, res) => {
  try {
    const tempPath = req.file.path;

    const result = await cloudinary.uploader.upload(tempPath, {
      folder: 'avatars',
    });

    await User.findByIdAndUpdate(userId, { avatar: result.secure_url });

    fs.unlinkSync(tempPath);

    res.status(200).json({ message: 'Avatar uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading avatar' });
  }
};
