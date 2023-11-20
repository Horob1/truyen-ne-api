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
      res.status(404).json({ status: 'fail', message: 'something was wrong' });
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

    if (req.user) {
      const history = await Collection.findOneAndUpdate(
        {
          user: req.user.id,
          novel: req.params.novelId,
        },
        { $set: { timestamp: Date.now(), chapter: req.params.chapterId } },
        {
          new: true,
          runValidators: true,
        }
      );

      console.log(history);
      if (!history) {
        const newCollection = new Collection({
          user: req.user.id,
          novel: req.params.novelId,
          chapter: req.params.chapterId,
        });
        await newCollection.save();
      }
    }

    res.status(200).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
