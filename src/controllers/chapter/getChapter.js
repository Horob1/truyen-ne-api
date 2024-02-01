import Chapter from '../../models/chapterModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const getChapter = async (req, res, next) => {
  try {
    const features = new APIFeatures(Chapter.find(), req.query);
    features.filter().paginate().sort().limitFields();
    const chapter = await features.data;

    res.status(200).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
