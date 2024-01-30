import Novel from '../../models/novelModel.js';
import Translator from '../../models/userModel.js';

export const getNovelBySlug = async (req, res, next) => {
  try {
    const novel = await Novel.findOne({ slugNovel: req.params.slugNovel });
    if (!novel) return res.status(404).json({ status: 'Novel not found' });

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
