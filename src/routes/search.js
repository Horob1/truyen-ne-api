import { Router } from 'express';
import { search } from '../controllers/novel/getNovelList.js';
import { searchF } from '../controllers/forum/getForumPostList.js';

const router = Router();

router.route('/novel').get(search);

router.route('/forum').get(searchF);

export default router;
