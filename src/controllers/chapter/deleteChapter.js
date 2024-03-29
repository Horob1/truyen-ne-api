import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const deleteChapter = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId)
      return res.status(404).json({ status: 'permission denied' });

    const deletedChapter = await Chapter.findByIdAndDelete(
      req.params.chapterId
    );

    if (!deletedChapter)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    await Novel.findByIdAndUpdate(
      req.params.novelId,
      { $inc: { progress: -1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
