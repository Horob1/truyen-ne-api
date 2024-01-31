import Collection from '../../models/collectionModel.js';

export const getCollections = async (req, res, next) => {
  try {
    //TODO:
    const collection = await Collection.find({
      user: req.user.id,
    });

    res.status(200).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getLoveList = async (req, res, next) => {
  try {
    //TODO:
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
