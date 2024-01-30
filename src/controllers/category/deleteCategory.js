import Category from '../../models/categoryModel.js';
import Novel from '../../models/novelModel.js';

export const deleteCategory = async (req, res, nexy) => {
  try {
    const cate = await Category.findByIdAndDelete(req.params.categoryId);

    if (!cate)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    await Novel.findOneAndUpdate(
      { categories: req.params.categoryId },
      { $pull: { category: req.params.categoryId } },
      { new: true }
    );

    return res.status(205).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};
