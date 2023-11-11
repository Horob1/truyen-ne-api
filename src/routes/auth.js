import { Router } from "express";
import { loginUser } from "../controllers/auth/login.js";
import { register } from "../controllers/auth/register.js";

const router = Router();

router.post("/register", register);
router.post("/login", loginUser);

export default router;
