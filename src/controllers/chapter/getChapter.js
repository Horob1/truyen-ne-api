import Novel from '../../models/novelModel.js';
import Chapter from '../../models/chapterModel.js';
import Translator from '../../models/userModel.js';
import Collection from '../../models/collectionModel.js';

export const getChapter = async (req, res, next) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(
      req.params.chapterId,
      { $inc: { watch: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!chapter) {
      return next(new AppError("'No document found with this ID'", 404));
    }

    chapter.translator = await Translator.findById(chapter.translator).select(
      'firstName lastName'
    );

    await Novel.findByIdAndUpdate(
      req.params.novelId,
      { $inc: { watch: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    await Collection.findOneAndUpdate(
      {
        user: req.user.id,
        novel: req.params.novelId,
      },
      { $set: { timestamp: Date.now } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
