import Comment from '../../models/commentModel';

export const deleteComment = async (req, res, next) => {
  try {
    const user = await Comment.findById(req.params.commentId).select('user')
      .user;

    if (req.user.id !== user)
      return next(new AppError(404, 'Permission denied'));

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
