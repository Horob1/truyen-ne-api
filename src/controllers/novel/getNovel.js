import Novel from '../../models/novelModel.js';

export const getNovel = async (req, res, next) => {
  try {
    //TODO:
    const query = req.query.q;
    const novels = Novel.find(query);
    res.status(200).json({
      status: 'success',
      novels,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
