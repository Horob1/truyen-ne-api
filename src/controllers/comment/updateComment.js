import Comment from '../../models/commentModel.js';

export const updateComment = async (req, res, next) => {
  try {
    const user = await Comment.findById(req.params.commentId).select('user');

    if (req.user.id !== user.id)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Permission denied' });

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

    return res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
