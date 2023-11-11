import { Router } from 'express';
import { checkAdminRole } from '../middleware/checkAdminRole.js';
import { listUser } from '../controllers/admin/listUser.js';
import { checkJWT } from '../middleware/checkJWT.js';
import { getUserInfo } from '../controllers/admin/getUserInfo.js';
const router = Router();

router.get('/list', checkJWT, checkAdminRole, listUser);
router.get('/user-info/:id', checkJWT, checkAdminRole, getUserInfo);

export default router;
