import Collection from '../../models/collectionModel.js';

export const getHistoryList = async (req, res, next) => {
  try {
    const historyList = await Collection.find({
      user: req.user.id,
    });

    res.status(200).json({
      status: 'success',
      result: historyList.length,
      historyList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
