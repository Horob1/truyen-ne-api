import Collection from '../../models/collectionModel';

export const createCollection = async (req, res, next) => {
  try {
    const user = req.params.user;

    const { isLove, chapter, novel } = req.body;

    const collection = new Collection({ isLove, chapter, novel, user });

    await collection.save();

    res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
