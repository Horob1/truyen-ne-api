import Novel from '../../models/novelModel.js';
import Review from '../../models/reviewModel.js';


export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);

    if (req.user.id !== review.user.id)
      return res.status(404).json({
        status: 'permission denied',
      });

    const thisNovel = await Novel.findByIdAndUpdate(
      req.params.novelId,
      { $inc: { rateSum: -review.rate, reviewsQuan: -1 } },
      { new: true }
    );

    if (thisNovel.reviewsQuan === 0) thisNovel.rateAvg = 0;
    else thisNovel.rateAvg = thisNovel.rateSum / thisNovel.reviewsQuan;

    await thisNovel.save();

    res.status(205).json({
      status: 'success',
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
