import Collection from '../../models/collectionModel';

export const getLoveList = async (req, res, next) => {
  try {
    const getLoveList = await Collection.find({
      auth: req.user.id,
      isLove: true,
    });

    res.status(200).json({
      status: 'success',
      getLoveList,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
