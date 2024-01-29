import { Router } from 'express';
import { checkJWT } from '../middleware/checkJWT.js';
import { changePassword } from '../controllers/user.controller/client/changePassword.js';
import { logOut } from '../controllers/user.controller/client/logOut.js';
import { getProfile } from '../controllers/user.controller/client/getProfile.js';
const router = Router();

router.post('/change-password', checkJWT, changePassword);
router.post('/logout', checkJWT, logOut);
router.get('/profile', checkJWT, getProfile);
export default router;
