import { Router } from 'express';
import { getNovelById } from '../controllers/novel/getNovelById.js';
import { createNovel } from '../controllers/novel/createNovel.js';
import { updateNovel } from '../controllers/novel/updateNovel.js';
import { deleteNovel } from '../controllers/novel/deleteNovel.js';
import { checkJWT } from '../middleware/checkJWT.js';
import { rejectUser } from '../middleware/rejectUser.js';
import { createChapter } from '../controllers/chapter/createChapter.js';
import { deleteChapter } from '../controllers/chapter/deleteChapter.js';
import { updateChapter } from '../controllers/chapter/updateChapter.js';
import { getChapter } from '../controllers/chapter/getChapter.js';
import { getChapterList } from '../controllers/chapter/getChapterList.js';
import { checkUser } from '../middleware/checkUser.js';
import { getReviewList } from '../controllers/review/getReviewList.js';
import { createReview } from '../controllers/review/createReview.js';
import { updateReview } from '../controllers/review/updateReview.js';
import { deleteReview } from '../controllers/review/deleteReview.js';
import {
  getTop10View,
  getTop10Finished,
  getTop10Newest,
  getNovelList,
} from '../controllers/novel/getNovelList.js';
import { getNewChapterList } from '../controllers/chapter/getNewChapterList.js';
import { getNovelBySlug } from '../controllers/novel/getNovelBySlug.js';
import { getChapterBySlug } from '../controllers/chapter/getChapterBySlug.js';

const router = Router();

router.route('/').get(getNovelList);
router.route('/top-10-view').get(getTop10View);
router.route('/moi-ra-lo').get(getNewChapterList);
router.route('/top-10-finished').get(getTop10Finished);
router.route('/top-10-newest').get(getTop10Newest);
//get a novel
router.route('/:novelId').get(getNovelById);
//get Chapter
router.route('/:slugNovel/:slugChapter').get(getChapterBySlug);
router.route('/:novelId/chapterList').get(getChapterList);
//get review List
router.route('/:novelId/review').get(getReviewList);

router.route('/:novelId/:chapterId').get(checkUser, getChapter);
//admin or translator
router.use(checkJWT, rejectUser);
router.post(
  '/',
  upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  createNovel
);

router.patch(
  '/:novelId',
  upload.fields([
    { name: 'coverImg', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  updateNovel
);
router.delete('/:novelId', deleteNovel);

//post a review
router.route('/:novelId/review').post(createReview);

router
  .route('/:novelId/review/:reviewId')
  .patch(updateReview)
  .delete(deleteReview);
//admin or translator
router.use(rejectUser);

router.route('/').post(createNovel);

router.route('/:novelId').patch(updateNovel).delete(deleteNovel);

//create chapter
router.route('/:novelId').post(createChapter);

router.route('/:novelId/:chapterId').delete(deleteChapter).patch(updateChapter);

export default router;
