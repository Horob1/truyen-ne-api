import review from '../../models/reviewModel.js';

export const getReviewList = async (req, res, next) => {
  try {
    const novel = req.params.id;
    const reviewList = await Chapter.find({ novel: novel }).select(
      'content _id user rate createTime'
    );

    res.status(200).json({
      status: 'success',
      reviewList,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
