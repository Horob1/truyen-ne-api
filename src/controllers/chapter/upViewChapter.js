import Chapter from '../../models/chapterModel.js';

export const upViewChapter = async (req, res, next) => {
  try {
    let chapter = await Chapter.findById(req.params.chapterId);

    if (!chapter) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });
    }

    chapter.watch = chapter.watch + 1;

    await chapter.save();

    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
