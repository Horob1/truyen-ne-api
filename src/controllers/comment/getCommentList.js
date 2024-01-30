import Comment from '../../models/commentModel.js';

export const getForumCommentList = async (req, res, next) => {
  try {
    const commentList = await Comment.find({
      forum: req.params.forumId,
    });

    return res.status(200).json({
      status: 'success',
      result: commentList.length,
      commentList,
    });
  } catch (error) {
    return res.status(500).json(err);
  }
};

export const getChapterCommentList = async (req, res, next) => {
  try {
    const commentList = await Comment.find({
      chapter: req.params.chapterId,
    });

    res.status(200).json({
      status: 'success',
      result: commentList.length,
      commentList,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
