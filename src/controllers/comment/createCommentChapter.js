import Comment from '../../models/commentModel.js';

export const createCommentChapter = async (req, res, next) => {
  try {
    const { content, reply } = req.body;

    const user = req.user.id;
    let isReply = false;

    const chapter = req.params.chapterId;

    if (reply) {
      isReply = true;
    }

    const comment = new Comment({
      content,
      user,
      reply,
      chapter,
      isReply,
    });

    await comment.save();

    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
