// import Forum from '../../models/forumModel.js';

// export const updateForumPost = async (req, res, next) => {
//   try {
//     const user = await Forum.findById(req.params.forumId).select('auth');

//     if (req.user.id !== user.auth)
//       return res
//         .status(404)
//         .json({ status: 'fail', message: 'Permission denied' });

//     const { heading, content } = req.body;

//     const forumPost = await Forum.findByIdAndUpdate(req.params.forumId, {
//       heading,
//       content,
//     });

//     res.status(200).json({
//       status: 'success',
//       forumPost,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
