import Collection from '../../models/collectionModel.js';

export const getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.find({
      user: req.user.id,
      novel: req.params.novelId,
    });

    if (!collection) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });
    }

    return res.status(200).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
