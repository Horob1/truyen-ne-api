import Forum from '../../models/forumModel';

export const deleteForumPost = async (req, res, next) => {
  try {
    const user = await Forum.findById(req.params.forumId).select('auth').auth;

    if (req.user.id != user)
      return next(new AppError(404, 'Permission denied'));

    await Forum.findByIdAndDelete(req.params.forumId);

    await Forum.deleteMany({ forum: req.params.forumId });

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
