import { Router } from 'express';
import { search } from '../controllers/novel/getNovelList';
import { searchF } from '../controllers/forum/getForumPostList';


const router = Router();

router.route('/novel').get(search);

router.route('/forum').get(searchF);

export default router;
