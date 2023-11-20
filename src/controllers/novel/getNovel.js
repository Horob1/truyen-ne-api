import AppError from '../../utils/appError.js';
import Novel from '../../models/novelModel.js';
import Author from '../../models/authorModel.js';
import Translator from '../../models/userModel.js';

export const getNovel = async (req, res, next) => {
  try {
    let novel = await Novel.findById(req.params.novelId);
    if (!novel) return res.status(404).json({ status: 'permission denied' });

    if (novel.translator) {
      novel.translator = await Translator.findById(novel.translator).select(
        'firstName lastName avatar'
      );
    }

    if (novel.author) {
      novel.author = await Author.findById(novel.author).select('name');
    }

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
