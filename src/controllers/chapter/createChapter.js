import Chapter from '../../models/chapterModel.js';
import Novel from '../../models/novelModel.js';

export const createChapter = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');
    const translatorId = user.translator.id;

    if (req.user.id !== translatorId)
      return res.status(403).json({ status: 'permission denied' }); // Sử dụng mã trạng thái 403 để biểu thị lỗi phân quyền

    const { name, content, number } = req.body;
    const translator = req.user.id;
    const novel = req.params.novelId;

    if (!(await Novel.findById(novel)))
      return res.status(404).json({ status: 'ko có truyện này' });

    const chapter = new Chapter({
      name,
      content,
      novel,
      translator,
      number,
    });

    await chapter.save();

    await Novel.findByIdAndUpdate(
      req.params.novelId,
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
