import Collection from '../../models/collectionModel.js';

export const createCollection = async (req, res, next) => {
  try {
    const user = req.user.id;
    const novel = req.params.novelId;

    const isLove = req.body.isLove;

    const collection = new Collection({ isLove, novel, user });

    if (!collection) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });
    }

    await collection.save();

    return res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
