import Collection from '../../models/collectionModel.js';

export const updateCollection = async (req, res, next) => {
  try {
    const { isLove } = req.body;

    const collection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      { isLove }
    );

    if (!collection) {
      res.status(404).json({ status: 'fail', message: 'something was wrong' });
    }

    collection.isLove = isLove;

    res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
