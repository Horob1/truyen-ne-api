import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const createNovel = async (req, res) => {
  try {
    const { name, description, debutDate, categories, author, slugNovel } =
      req.body;
    const translator = req.user.id;

    // Tạo mới đối tượng Novel và lưu vào cơ sở dữ liệu
    const newNovel = new Novel({
      name,
      description,
      debutDate,
      categories,
      translator,
      author,
      slugNovel,
    });

    // Lưu đối tượng Novel vào cơ sở dữ liệu
    await newNovel.save();

    // Kiểm tra xem có đủ 2 files hay không
    if (!req.files || req.files.length !== 2) {
      return res.status(400).json({ message: 'Please upload exactly 2 files' });
    }

    // Upload ảnh cover và photo lên Cloudinary
    const coverImgResult = await cloudinary.uploader.upload(req.files[0].path, {
      folder: 'coverImg',
    });
    const photoResult = await cloudinary.uploader.upload(req.files[1].path, {
      folder: 'photo',
    });

    // Cập nhật URL ảnh vào đối tượng Novel
    newNovel.coverImg = coverImgResult.secure_url;
    newNovel.photo = photoResult.secure_url;

    // Lưu đối tượng Novel đã cập nhật vào cơ sở dữ liệu
    await newNovel.save();

    // Trả về kết quả thành công
    res.status(201).json({
      status: 'success',
      newNovel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};
