import Forum from '../../models/forumModel.js';

export const deleteForumPost = async (req, res, next) => {
  try {
    const user = await Forum.findById(req.params.forumId).select('auth');

    if (req.user.id !== user.auth)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Permission denied' });

    await Forum.findByIdAndDelete(req.params.forumId);

    await Comment.deleteMany({ forum: req.params.forumId });

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
