import { Router } from 'express';
import { loginUser } from '../controllers/user.controller/auth/login.js';
import { register } from '../controllers/user.controller/auth/register.js';
import { requestRefreshToken } from '../utils/requestRefreshToken.js';

const router = Router();

router.post('/register', register);
router.post('/login', loginUser);
router.post('/refresh-token', requestRefreshToken);

export default router;
