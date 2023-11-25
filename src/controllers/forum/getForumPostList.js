import Forum from '../../models/forumModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const searchF = async (req, res, next) => {
  try {
    const features = new APIFeatures(
      Forum.find({
        heading: { $regex: req.body.search, $options: 'i' },
        novel: req.body.novel,
      }),
      req.query
    )
      .fillter()
      .sort()
      .limitFields()
      .paginate();

    const forumList = await features.data;

    res.status(200).json({
      status: 'success',
      result: forumList.length,
      forumList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
