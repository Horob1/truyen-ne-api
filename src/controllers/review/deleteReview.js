import Novel from '../../models/novelModel.js';
import Review from '../../models/reviewModel.js';
import AppError from '../../utils/appError.js';

export const deleteReview = async (req, res, next) => {
  try {
    const user = await Review.findById(req.params.reviewId).select('user').user;

    if (req.user.id != user )
      return next(new AppError(404, 'Permission denied'));

    const review = await Review.findByIdAndDelete(req.params.reviewId);

    await Novel.findByIdAndUpdate(req.params.id, [
      { $inc: { rateSum: -review.rate } },
      { $inc: { reviewsQuan: -1 } },
      {
        $set: {
          rateAvg: {
            $cond: {
              if: { $eq: ['$reviewsQuan', 0] },
              then: 0, // To avoid division by zero
              else: { $divide: ['$rateSum', '$reviewsQuan'] },
            },
          },
        },
      },
    ]);

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
