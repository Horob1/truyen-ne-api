import Novel from '../../models/novelModel.js';

export const updateNovel = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator');

    const translatorId = user.translator.toString();

    if (req.user.id !== translatorId)
      return res.status(404).json({ status: 'permission denied' });

    const { name, description, debutDate, photo, categories, coverImg } =
      req.body;

    let author = req.body.author;

    if (req.body.isMine) {
      author = undefined;
    }
    let novel = await Novel.findByIdAndUpdate(
      req.params.novelId,
      {
        name,
        description,
        debutDate,
        photo,
        categories,
        author,
        coverImg,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!novel)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    novel = await Novel.findById(req.params.novelId);

    res.status(201).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
