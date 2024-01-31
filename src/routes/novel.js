import { Router } from 'express';

import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';

import { checkUser } from '../middleware/checkUser.js';

import { getNovel } from '../controllers/novel/getNovel.js';
import { getNovelById } from '../controllers/novel/getNovelById.js';
import { getChapter } from '../controllers/chapter/getChapter.js';
import { getChapterList } from '../controllers/chapter/getChapterList.js';
import {getReviewList} from '../controllers/review/getReviewList.js'
import { deleteChapter } from '../controllers/chapter/deleteChapter.js';
import { updateChapter } from '../controllers/chapter/updateChapter.js';
import { createChapter } from '../controllers/chapter/createChapter.js';
import { createNovel } from '../controllers/novel/createNovel.js';
import { updateNovel } from '../controllers/novel/updateNovel.js';
import { deleteNovel } from '../controllers/novel/deleteNovel.js';
import { createReview } from '../controllers/review/createReview.js';
import { updateReview } from '../controllers/review/updateReview.js';
import { deleteReview } from '../controllers/review/deleteReview.js';
const router = Router();

router.route('/').get(getNovel);

//get a novel
router.route('/:novelId').get(getNovelById);
//get Chapter
router.route('/:novelId/chapter').get(getChapter);
router.route('/:novelId/chapterList').get(getChapterList);
//get review List
router.route('/:novelId/review').get(getReviewList);

router.route('/:novelId/:chapterId').get(checkUser, getChapter);
//admin or translator
router.use(checkJWT, rejectUser);

router.route('/').post(createNovel);

router.route('/:novelId').patch(updateNovel).delete(deleteNovel);

//post a review
router.route('/:novelId/review').post(createReview);

router
  .route('/:novelId/review/:reviewId')
  .patch(updateReview)
  .delete(deleteReview);

//create chapter
router.route('/:novelId').post(createChapter);

router.route('/:novelId/:chapterId').delete(deleteChapter).patch(updateChapter);

export default router;
