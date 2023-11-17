import Novel from '../../models/novelModel.js';
import Review from '../../models/reviewModel.js';

export const updateReview = async (req, res, next) => {
  try {
    const oldReview = await Review.findById(req.params.id);

    if (oldReview.user != req.user.id)
      return next(new AppError(404, 'Permission denied'));

    const { content, rate } = req.body;

    const review = await Review.findByIdAndUpdate(req.params.id, {
      content,
      rate,
    });

    if (oldReview.rate != rate) {
      await Novel.findByIdAndUpdate(oldReview.novel, [
        { $inc: { rateSum: rate - oldReview.rate } },
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
    }

    res.status(201).json({
      status: 'success',
      review,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
