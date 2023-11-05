import Novel from '../../models/novelModel.js';

module.export = async (req, res, next) => {
  try {
    const { name, description, debutDate, photo, categories, translator } =
      req.body;

    let author = req.body.author;

    if (req.body.isMine) {
      author = null;
    }
    const novel = await Novel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        debutDate,
        photo,
        categories,
        translator,
        author,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
