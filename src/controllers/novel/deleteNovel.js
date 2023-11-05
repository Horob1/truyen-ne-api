import Novel from '../../models/novelModel.js';
import Chapter from '../../models/chapterModel.js';
import Collection from '../../models/collectionModel.js';
import Comment from '../../models/commentModel.js';
import Forum from '../../models/forumModel.js';
import Review from '../../models/reviewModel.js';

module.export = async (req, res, next) => {
  try {
    await Chapter.deleteMany({ novel: req.params.id });
    await Collection.deleteMany({ novel: req.params.id });
    await Comment.deleteMany({ novel: req.params.id });
    await Forum.deleteMany({ novel: req.params.id });
    await Review.deleteMany({ novel: req.params.id });

    await Novel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
