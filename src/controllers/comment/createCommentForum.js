import Comment from '../../models/commentModel.js';
import Forum from '../../models/forumModel.js';

export const createCommentForum = async (req, res, next) => {
  try {
    const { content, reply, novel } = req.body;

    const forum = req.params.forumId;

    const user = req.user.id;

    const forumPost = await Forum.findById(forum);

    if (forumPost.isClose) {
      return res.status(404).json({ status: 'fail', message: 'post is close' });
    }

    let isReply = false;

    if (reply) isReply = true;

    const comment = new Comment({
      content,
      user,
      reply,
      forum,
      novel,
      isReply,
    });

    await comment.save();

    res.status(201).json({
      status: 'success',
      comment,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
