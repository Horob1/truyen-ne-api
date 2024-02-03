import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';
import { createAuthor } from '../controllers/author/createAuthor.js';
import { getAuthor } from '../controllers/author/getAuthor.js';
import { getAuthorById } from '../controllers/author/getAuthorById.js';
import { updateAuthor } from '../controllers/author/updateAuthor.js';
import { deleteAuthor } from '../controllers/author/deleteAuthor.js';


const router = Router();
router.route('/').get(getAuthor);
router.use(checkJWT, rejectUser);

router
  .route('/:authorId')
  .get(getAuthorById)
  .patch(updateAuthor)
  .delete(deleteAuthor);

router.route('/').post(createAuthor);

export default router;
