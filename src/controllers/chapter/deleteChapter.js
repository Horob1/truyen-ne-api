import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const deleteChapter = async (req, res, next) => {
  try {
    const user = await Chapter.findById(req.params.chapterId).select(
      'translator'
    ).translator;

    if (req.user.id != user)
      return next(new AppError(404, 'Permission denied'));

    const deletedChapter = await Chapter.findByIdAndDelete(
      req.params.chapterId
    );

    await Novel.findByIdAndUpdate(
      req.params.id,
      { $inc: { progress: -1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
