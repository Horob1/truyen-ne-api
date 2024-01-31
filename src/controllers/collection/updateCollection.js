import Collection from '../../models/collectionModel.js';

export const updateCollection = async (req, res, next) => {
  try {
    const user = req.user.id;
    const novel = req.params.novelId;
    const isLove = req.body.isLove;
    const query = { novel, user };
    const update = { user, novel, isLove };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };


    const collection = await Collection.findOneAndUpdate(
      query,
      update,
      options,
      function (error, result) {
        if (error) return;

        // do something with the document
      }
    );

    res.status(201).json({
      status: 'success',
      collection,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
