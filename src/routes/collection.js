import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { getCollection } from '../controllers/collection/getCollection.js';
import { getHistoryList } from '../controllers/collection/getHistoryList.js';
import { getLoveList } from '../controllers/collection/getLoveList.js';
import { createCollection } from '../controllers/collection/createCollection.js';
import { updateCollection } from '../controllers/collection/updateCollection.js';

const router = Router();

router.use(checkJWT);

router.route('/:novelId').post(createCollection).get(getCollection);

router.route('/:collectionId').patch(updateCollection);

router.route('/list/history').get(getHistoryList);

router.route('/list/love').get(getLoveList);

export default router;
