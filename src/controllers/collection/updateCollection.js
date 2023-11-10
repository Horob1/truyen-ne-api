import Collection from '../../models/collectionModel';

export const createCollection = async (req, res, next) => {
  try {
    const user = await Collection.findById(req.params.collectionId).select(
      'auth'
    ).auth;

    if (req.user.id != user)
      return next(new AppError(404, 'Permission denied'));

    const { isLove, chapter } = req.body;

    const collection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      { isLove, chapter }
    );

    res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
