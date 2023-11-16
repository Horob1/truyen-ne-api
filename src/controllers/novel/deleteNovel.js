import Novel from '../../models/novelModel.js';
import Chapter from '../../models/chapterModel.js';
import Collection from '../../models/collectionModel.js';
import Comment from '../../models/commentModel.js';
import Forum from '../../models/forumModel.js';
import Review from '../../models/reviewModel.js';

export const deleteNovel = async (req, res, next) => {
  try {
    const user = await Novel.findById(req.params.novelId).select('translator')
      .translator;

    if (req.user.id !== user )
      return next(new AppError(404, 'Permission denied'));

    await Chapter.deleteMany({ novel: req.params.novelId });
    await Collection.deleteMany({ novel: req.params.novelId });
    await Comment.deleteMany({ novel: req.params.novelId });
    await Forum.deleteMany({ novel: req.params.novelId });
    await Review.deleteMany({ novel: req.params.novelId });

    await Novel.findByIdAndDelete(req.params.novelId);

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
