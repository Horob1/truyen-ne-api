import Chapter from '../../models/chapterModel.js';

export const updateChapter = async (req, res, next) => {
  try {
    const user = await Chapter.findById(req.params.chapterId).select(
      'translator'
    ).translator;

    if (req.user.id != user )
      return next(new AppError(404, 'Permission denied'));

    const { number, content } = req.body;

    const chapter = await Chapter.findByIdAndUpdate(
      req.params.chapterId,
      {
        number,
        content,
      },
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
