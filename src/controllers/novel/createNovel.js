import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const createNovel = async (req, res) => {
  try {
    const { name, description, photo, categories, author } = req.body;

    const translator = req.user.id;

    const newNovel = new Novel({
      name,
      description,
      photo,
      categories,
      translator,
      author,
    });

    await newNovel.save();

    // Trả về kết quả thành công
    res.status(201).json({
      status: 'success',
      newNovel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
