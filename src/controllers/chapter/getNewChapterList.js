import Chapter from '../../models/chapterModel.js';

export const getNewChapterList = async (req, res, next) => {
  try {
    const chapterList = await Chapter.find({ novel: novel })
      .select('name _id number translator createTime')
      .sort('-createTime')
      .populate({
        path: 'translator',
        select: 'firstName lastName avatar',
      })
      .populate({
        path: 'author',
        select: 'name',
      })
      .limit(10);

    return res.status(200).json({
      status: 'success',
      result: chapterList.length,
      chapterList,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
