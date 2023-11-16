import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const createChapter = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select(
      'translator'
    ).translator;

    if (req.user.id !== user)
      return next(new AppError(404, 'Permission denied'));

    const { name, content, number } = req.body;
    const translator = req.user.id;
    const novel = req.params.id;
    const chapter = new Chapter({ name, content, novel, translator, number });

    await chapter.save();

    await Novel.findByIdAndUpdate(
        req.params.id,
      { $inc: { progress: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
