import Category from '../../models/categoryModel';

export const createCategory = async (req, res, nexy) => {
  try {
    const { name, description } = req.body;

    const category = new Category({ name, description });

    await category.save();

    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(500).json(err);
  }
};
