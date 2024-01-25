import Collection from '../../models/collectionModel.js';

export const getCollection = async (req, res, next) => {
  try {
    const collection = await Collection.find({
      user: req.user.id,
      novel: req.params.novelId,
    });

    res.status(200).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
