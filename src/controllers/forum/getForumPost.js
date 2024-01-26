import Forum from '../../models/forumModel.js';

export const getForumPost = async (req, res, next) => {
  try {
    const forumPost = await Forum.findById(req.params.forumId);

    res.status(201).json({
      status: 'success',
      forumPost,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
