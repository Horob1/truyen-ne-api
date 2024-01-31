import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { updateCollection } from '../controllers/collection/updateCollection.js';
import { getCollection } from '../controllers/collection/getCollection.js';
import {
  getCollections,
  getLoveList,
} from '../controllers/collection/getCollections.js';
import { deleteCollection } from '../controllers/collection/deleteCollection.js';

const router = Router();

router.use(checkJWT);

router
  .route('/:novelId')
  .post(updateCollection)
  .get(getCollection)
  .delete(deleteCollection);

router.route('/history').get(getCollections);

router.route('/love').get(getLoveList);

export default router;
