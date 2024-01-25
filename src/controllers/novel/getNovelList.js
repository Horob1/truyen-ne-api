import Novel from '../../models/novelModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const search = async (req, res, next) => {
  try {
    const features = new APIFeatures(
      Novel.find({
        name: { $regex: req.body.search, $options: 'i' },
        categories: req.body.categories,
      }),
      req.query,
    )
      .fillter()
      .sort()
      .limitFields()
      .paginate();

    const novels = await features.data;

    res.status(200).json({
      status: 'success',
      result: novels.length,
      novels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTop10View = async (req, res, next) => {
  try {
    const novels = await Novel.find().limit(10).sort('-watch');

    res.status(200).json({
      status: 'success',
      result: novels.length,
      novels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTop10Finished = async (req, res, next) => {
  try {
    const novels = await Novel.find({
      status: 'Hoàn thành',
    })
      .limit(10)
      .sort('-watch');

    res.status(200).json({
      status: 'success',
      result: novels.length,
      novels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTop10Newest = async (req, res, next) => {
  try {
    const novels = await Novel.find().limit(10).sort('-createTime');

    res.status(200).json({
      status: 'success',
      result: novels.length,
      novels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
