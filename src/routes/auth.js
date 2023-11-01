import { Router } from "express";
import { loginUser } from "../controllers/auth/login.js";
import { registerUser } from "../controllers/auth/register.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
