import Novel from '../../models/novelModel.js';

export const updateNovel = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator')
      .translator;

    if (req.user.id != user)
      return next(new AppError(404, 'Permission denied'));

    const { name, description, debutDate, photo, categories } = req.body;

    let author = req.body.author;

    if (req.body.isMine) {
      author = undefined;
    }
    const novel = await Novel.findByIdAndUpdate(
      req.params.novelId,
      {
        name,
        description,
        debutDate,
        photo,
        categories,
        author,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(201).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
