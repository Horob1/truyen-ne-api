import Comment from '../../models/commentModel';

export const getForumCommentList = async (req, res, next) => {
  try {
    const commentList = await Comment.find({
      forum: req.params.forumId,
    });

    res.status(200).json({
      status: 'success',
      result: commentList.length,
      commentList,
    });
  } catch (error) {
    res.status(500).json(err);
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
      res.status(500).json(err);
    }
  };
  