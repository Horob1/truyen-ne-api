import Author from '../../models/authorModel.js';
import Novel from '../../models/novelModel.js';

export const getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.authorId);

    if (!author)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    //query novel of author
    const novels = await Novel.find({ author: req.params.authorId });

    author.novels = novels;

    return res.status(200).json({
      status: 'success',
      author,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
