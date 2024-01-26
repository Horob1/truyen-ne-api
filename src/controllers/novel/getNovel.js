import Novel from '../../models/novelModel.js';
import Translator from '../../models/userModel.js';

export const getNovel = async (req, res, next) => {
  try {
    let novel = await Novel.findById(req.params.novelId);
    if (!novel) return res.status(404).json({ status: 'permission denied' });

    res.status(200).json({
      status: 'success',
      novel,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
