import Category from '../../models/categoryModel.js';

export const updateCategory = async (req, res, nexy) => {
  try {
    const { name, description } = req.body;

    let category = await Category.findByIdAndUpdate(req.params.categoryId, {
      name,
      description,
    });

    if (!category)
      return res
        .status(404)
        .json({ status: 'fail', message: 'something was wrong' });

    category = await Category.findById(req.params.categoryId);

    return res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
