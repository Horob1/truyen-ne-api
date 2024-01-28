import Novel from '../../models/novelModel.js';
import APIFeatures from '../../utils/apiFeatures.js';

export const getNovelList = async (req, res, next) => {
  try {
    const search = req.body.search || '';
    const categories = req.body.categories || [];
    const query = {
      name: { $regex: search, $options: 'i' },
      categories: categories,
    };
    const features = new APIFeatures(Novel.find(query), req.query);
    features.filter().paginate().sort().limitFields();
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
