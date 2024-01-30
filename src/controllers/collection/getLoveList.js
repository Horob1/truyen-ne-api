import Collection from '../../models/collectionModel.js';

export const getLoveList = async (req, res, next) => {
  try {
    const loveList = await Collection.find({
      user: req.user.id,
      isLove: true,
    });

    return res.status(200).json({
      status: 'success',
      result: loveList.length,
      loveList,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
