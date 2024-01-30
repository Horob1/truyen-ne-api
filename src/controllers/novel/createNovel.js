import Novel from '../../models/novelModel.js';

export const createNovel = async (req, res, next) => {
  try {
    const {
      name,
      description,
      debutDate,
      photo,
      categories,
      author,
      coverImg,
    } = req.body;

    const translator = req.user.id;

    const newNovel = new Novel({
      name,
      description,
      debutDate,
      photo,
      categories,
      translator,
      author,
    });

    await newNovel.save();

    res.status(201).json({
      status: 'success',
      newNovel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
