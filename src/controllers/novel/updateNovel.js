import { v2 as cloudinary } from 'cloudinary';
import Novel from '../../models/novelModel.js';

export const updateNovel = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId);

    const translatorId = user.translator.id;

    if (req.user.id !== translatorId) {
      return res.status(404).json({ status: 'permission denied' });
    }

    const { name, description, photo, categories, coverImg } = req.body;

    let author = req.body.author;

    if (req.body.isMine) {
      author = undefined;
    }

    let novel = await Novel.findByIdAndUpdate(
      req.params.novelId,
      {
        name,
        description,
        photo,
        categories,
        author,
        coverImg,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!novel)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    if (req.files && req.files.length === 2) {
      // Nếu có, thực hiện upload ảnh cover và photo lên Cloudinary
      const coverImg = await cloudinary.uploader.upload(req.files[0].path, {
        folder: 'Data/coverImg',
      });
      const photo = await cloudinary.uploader.upload(req.files[1].path, {
        folder: 'Data/photo',
      });

      // Cập nhật URL ảnh vào đối tượng Novel
      novel.coverImg = coverImg.secure_url;
      novel.photo = photo.secure_url;
    }

    // Kiểm tra xem có file photo được upload không
    if (req.files['photo']) {
      const photo = await cloudinary.uploader.upload(
        req.files['photo'][0].path,
        {
          folder: 'Data/photo',
        }
      );
      novel.photo = photo.secure_url;
    }

    await novel.save();

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
