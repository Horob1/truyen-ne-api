import Author from '../../models/authorModel';

export const updateAuthor = async (req, res, next) => {
  try {
    const { name, birthday, description, avatar } = req.body;

    const author = await Author.findByIdAndUpdate(req.params.authorId, {
      name,
      birthday,
      description,
      avatar,
    });

    res.status(201).json({
      status: 'success',
      author,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
