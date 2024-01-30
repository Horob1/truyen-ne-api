import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';

import { createAuthor } from '../controllers/author/createAuthor.js';
import { deleteAuthor } from '../controllers/author/deleteAuthor.js';
import { getAuthor } from '../controllers/author/getAuthor.js';
import { updateAuthor } from '../controllers/author/updateAuthor.js';
import { getAuthorBySlug } from '../controllers/author/getAuthorBySlug.js';

const router = Router();
router.route('/:slugAuthor').get(getAuthorBySlug);
router.use(checkJWT, rejectUser);

router
  .route('/:authorId')
  .get(getAuthor)
  .patch(updateAuthor)
  .delete(deleteAuthor);

router.route('/').post(createAuthor);

export default router;
