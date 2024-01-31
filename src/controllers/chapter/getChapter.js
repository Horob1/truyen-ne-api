import Novel from '../../models/novelModel.js';
import Chapter from '../../models/chapterModel.js';
import Translator from '../../models/userModel.js';
import Collection from '../../models/collectionModel.js';
import { query } from 'express';

export const getChapter = async (req, res, next) => {
  try {
    const query = req.query.q;
    const chapter = await Chapter.findOneAndUpdate(
      { query },
      { $inc: { watch: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    await Novel.findByIdAndUpdate(
      req.params.novelId,
      { $inc: { watch: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: 'success',
      chapter,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
