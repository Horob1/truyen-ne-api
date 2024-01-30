import Author from '../../models/authorModel.js';

export const createAuthor = async (req, res, next) => {
  try {
    const { name, birthday, description, avatar, slugAuthor } = req.body;

    const author = new Author({
      name,
      birthday,
      description,
      avatar,
      slugAuthor,
    });

    await author.save();

    res.status(201).json({
      status: 'success',
      author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
