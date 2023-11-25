import Comment from '../../models/commentModel';

export const deleteComment = async (req, res, next) => {
  try {
    const user = await Comment.findById(req.params.commentId).select('user');

    if (req.user.id !== user.id)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Permission denied' });

    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
