import Forum from '../../models/forumModel';

export const createForumPost = async (req, res, next) => {
  try {
    const { heading, content, novel, chapter } = req.body;

    const auth = req.user.id;

    const forumPost = new Forum({ heading, content, novel, chapter, auth });

    await forumPost.save();

    res.status(201).json({
      status: 'success',
      forumPost,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
