import Novel from '../../models/novelModel.js';
import Chapter from '../../models/chapterModel.js';
import Translator from '../../models/userModel.js';
import Collection from '../../models/collectionModel.js';

export const getChapterBySlug = async (req, res, next) => {
  try {
    // Tìm truyện dựa trên slug truyện
    const novel = await Novel.findOne({ slugNovel: req.params.slugNovel });

    if (!novel) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Novel not found' });
    }

    // Tìm chương dựa trên slug chương và _id của truyện tương ứng
    const chapter = await Chapter.findOneAndUpdate(
      { slugChapter: req.params.slugChapter, novel: novel._id },
      { $inc: { watch: 1 } },
      { new: true, runValidators: true }
    );

    if (!chapter) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Chapter not found' });
    }

    // Cập nhật lịch sử đọc nếu có người dùng đăng nhập
    if (req.user) {
      await Collection.findOneAndUpdate(
        { user: req.user.id, novel: novel._id },
        { $set: { timestamp: Date.now(), chapter: chapter._id } },
        { upsert: true, new: true }
      );
    }

    // Populate thông tin về người dịch của chương
    chapter.translator = await Translator.findById(chapter.translator).select(
      'firstName lastName'
    );

    // Trả về thông tin về truyện và chương
    res.status(200).json({
      status: 'successsssss',
      novel,
      chapter,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
