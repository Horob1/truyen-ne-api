import Collection from '../../models/collectionModel.js';

export const getLoveList = async (req, res, next) => {
  try {
    const loveList = await Collection.find({
      user: req.user.id,
      isLove: true,
    });

    res.status(200).json({
      status: 'success',
      loveList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
