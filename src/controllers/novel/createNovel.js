import Novel from '../../models/novelModel.js';

module.export = async (req, res, next) => {
  try {
    const { name, description, debutDate, photo, categories, translator } =
      req.body;

    let author = req.body.author;
    //kiểm tra xem có phải truyện tự sáng tác
    if (req.body.isMine) {
      author = null;
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
