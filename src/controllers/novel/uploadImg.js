import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const uploadImages = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);

    const novel = await Novel.findByIdAndUpdate(
      req.params.id,
      { coverImg: result.secure_url },
      { new: true }
    );

    res.status(200).json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
