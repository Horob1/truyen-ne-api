import Collection from '../../models/collectionModel';

export const getHistoryList = async (req, res, next) => {
  try {
    const getHistoryList = await Collection.find({
      auth: req.user.id,
    });

    res.status(200).json({
      status: 'success',
      getHistoryList,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};

