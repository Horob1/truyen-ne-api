import Chapter from '../../models/chapterModel.js';

export const getChapterList = async (req, res, next) => {
  try {
    const novel = req.params.novelId;
    const chapterList = await Chapter.find({ novel: novel })
      .select('name _id number createTime')
      .sort('number');

    return res.status(200).json({
      status: 'success',
      result: chapterList.length,
      chapterList,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
