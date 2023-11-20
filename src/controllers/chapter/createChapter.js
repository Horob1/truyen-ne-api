import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const createChapter = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId)
      return res.status(404).json({ status: 'permission denied' });

    const { name, content, number } = req.body;
    const translator = req.user.id;
    const novel = req.params.novelId;
    const chapter = new Chapter({ name, content, novel, translator, number });

    await chapter.save();

    const thisNovel = await Novel.findByIdAndUpdate(
      novel,
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
    res.status(500).json(error);
  }
};
