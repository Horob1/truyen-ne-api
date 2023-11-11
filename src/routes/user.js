import { Router } from "express";
import { checkJWT } from "../middleware/checkJWT.js";
import { changePassword } from "../controllers/client/changePassword.js";
const router = Router();

router.post("/change-password", checkJWT, changePassword);

export default router;
