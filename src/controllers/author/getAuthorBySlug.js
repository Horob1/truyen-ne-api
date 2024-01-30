import Author from '../../models/authorModel.js';
import Novel from '../../models/novelModel.js';

export const getAuthorBySlug = async (req, res, next) => {
  try {
    const author = await Author.findOne({ slugAuthor: req.params.slugAuthor });

    if (!author)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Author not found' });

    // Truy vấn tiểu thuyết của tác giả sử dụng _id của tác giả
    const novels = await Novel.find({ author: author._id });

    author.novels = novels;

    res.status(200).json({
      status: 'success',
      author,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
