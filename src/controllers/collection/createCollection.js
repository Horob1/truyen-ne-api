import Collection from '../../models/collectionModel.js';

export const createCollection = async (req, res, next) => {
  try {
    const user = req.user.id;
    const novel = req.params.novelId;

    const isLove = req.body.isLove;

    const collection = new Collection({ isLove, novel, user });

    if (!collection) {
      res.status(404).json({ status: 'fail', message: 'something was wrong' });
    }

    await collection.save();

    res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
