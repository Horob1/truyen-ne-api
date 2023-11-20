import Forum from '../../models/forumModel';

export const updateForumPost = async (req, res, next) => {
  try {
    const user = await Forum.findById(req.params.forumId).select('auth').auth;

    // if (req.user.id != user)
    //   return next(new AppError(404, 'Permission denied'));

    const { heading, content } = req.body;

    const forumPost = await Forum.findByIdAndUpdate(req.params.forumId, {
      heading,
      content,
    });

    res.status(200).json({
      status: 'success',
      forumPost,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
