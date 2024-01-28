import { Router } from 'express';
import { loginUser } from '../controllers/user.controller/auth/login.js';
import { register } from '../controllers/user.controller/auth/register.js';
import { requestRefreshToken } from '../utils/requestRefreshToken.js';
import { forgotPassword } from '../controllers/user.controller/auth/forgotPass.js';
import { resetPassword } from '../controllers/user.controller/auth/resetPass.js';
const router = Router();

router.post('/register', register);
router.post('/login', loginUser);
router.post('/refresh-token', requestRefreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
