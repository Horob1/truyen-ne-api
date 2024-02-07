import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';
import { createCategory } from '../controllers/category/createCategory.js';
import { deleteCategory } from '../controllers/category/deleteCategory.js';
import { updateCategory } from '../controllers/category/updateCategory.js';
import { getCategories } from '../controllers/category/getCategories.js';

const router = Router();

router.use(checkJWT, rejectUser);

router.route('/').get(getCategories).post(createCategory);

router.route('/:categoryId').patch(updateCategory).delete(deleteCategory);

export default router;
