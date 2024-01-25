import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';

import { createAuthor } from '../controllers/author/createAuthor.js';
import { deleteAuthor } from '../controllers/author/deleteAuthor.js';
import { getAuthor } from '../controllers/author/getAuthor.js';
// import { getAuthorList } from '../controllers/author/getAuthorList.js';
import { updateAuthor } from '../controllers/author/updateAuthor.js';

const router = Router();

router.use(checkJWT, rejectUser);

router
  .route('/:authorId')
  .get(getAuthor)
  .patch(updateAuthor)
  .delete(deleteAuthor);

router.route('/').post(createAuthor);

export default router;
