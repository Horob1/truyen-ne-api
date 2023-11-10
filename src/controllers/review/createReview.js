import Novel from '../../models/novelModel.js';
import Review from '../../models/reviewModel.js';

export const createReview = async (req, res, next) => {
  try {
    const { content, novel, rate } = req.body;

    const user = req.user.id;
    const review = new Review(content, user, novel, rate);
    await review.save();

    await Novel.findByIdAndUpdate(req.params.id, [
      { $inc: { rateSum: rate } },
      { $inc: { reviewsQuan: 1 } },
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

    res.status(201).json({
      status: 'success',
      review,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
