import Collection from '../../models/collectionModel.js';

export const getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.find({
      user: req.user.id,
      novel: req.params.novelId,
    });

    if (!collection) {
      res.status(404).json({ status: 'fail', message: 'something was wrong' });
    }

    res.status(200).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
