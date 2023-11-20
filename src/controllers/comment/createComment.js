import Comment from '../../models/commentModel';
import Forum from '../../models/forumModel';


export const createComment = async (req, res, next) => {
  try {
    const { content, reply, forum, novel, chapter } = req.body;

    const user = req.user.id;
    let isReply = false;

    if (reply) {
      isReply = true;
    }

    const forumPost = await Forum.findById(forum);

    // if(forumPost.isClose) {
    //   return next(new AppError(404, "This post is close!"))
    // }

    const comment = new Comment({
      content,
      user,
      reply,
      forum,
      novel,
      chapter,
      isReply,
    });

    await comment.save();

    res.status(201).json({
        status: "success",
        comment
    });

  } catch (error) {
    res.status(500).json(err);
  }
};
