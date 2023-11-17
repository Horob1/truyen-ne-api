import Novel from '../../models/novelModel.js';

export const createNovel = async (req, res, next) => {
  try {
    const { name, description, debutDate, photo, categories } = req.body;

    const translator = req.user.id;

    let author = req.body.author;
    //kiểm tra xem có phải truyện tự sáng tác
    if (req.body.isMine) {
      author = undefined;
    }

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
    res.status(500).json(err);
  }
};
