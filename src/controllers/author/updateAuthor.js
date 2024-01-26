import Author from '../../models/authorModel.js';

export const updateAuthor = async (req, res, next) => {
  try {
    const { name, birthday, description, avatar } = req.body;

    let author = await Author.findByIdAndUpdate(req.params.authorId, {
      name,
      birthday,
      description,
      avatar,
    });

    if (!author)
      res.status(404).json({ status: 'fail', message: 'something was wrong' });

    author = await Author.findById(req.params.authorId);

    res.status(201).json({
      status: 'success',
      author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
