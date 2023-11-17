import Author from '../../models/authorModel';

export const getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.authorId);

    res.status(200).json({
      status: 'success',
      author,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
