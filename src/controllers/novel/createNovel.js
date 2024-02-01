import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const createNovel = async (req, res) => {
  try {
    const { name, description, debutDate, categories, author, slugNovel } =
      req.body;
    const translator = req.user.id;

    // Tạo mới đối tượng Novel
    const newNovel = new Novel({
      name,
      description,
      debutDate,
      categories,
      translator,
      author,
      slugNovel,
    });

    // Kiểm tra xem có file avatar được upload không
    if (req.files && req.files.length === 2) {
      // Nếu có, thực hiện upload ảnh cover và photo lên Cloudinary
      const coverImg = await cloudinary.uploader.upload(req.files[0].path, {
        folder: 'coverImg',
      });
      const photo = await cloudinary.uploader.upload(req.files[1].path, {
        folder: 'photo',
      });

      // Cập nhật URL ảnh vào đối tượng Novel
      newNovel.coverImg = coverImg.secure_url;
      newNovel.photo = photo.secure_url;
    }

    // Lưu đối tượng Novel vào cơ sở dữ liệu
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
