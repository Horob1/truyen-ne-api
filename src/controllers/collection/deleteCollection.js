import Collection from '../../models/collectionModel.js';

export const deleteCollection = async (req, res, next) => {
  try {
    const collection = await Collection.findByIdAndDelete(
      req.params.collectionId
    );

    res.status(205).json({});
  } catch (error) {
    res.status(500).json(error);
  }
};
