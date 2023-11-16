import Comment from '../../models/commentModel';

export const updateComment = async (req, res, next) => {
  try {
    const user = await Comment.findById(req.params.commentId).select('user')
      .user;

    if (req.user.id !== user)
      return next(new AppError(404, 'Permission denied'));

    const content = req.body.content;

    const comment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
