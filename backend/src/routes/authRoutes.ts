import { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { getProfile, updateProfile } from "../controllers/authController";

const router = Router();

router.get("/me", verifyToken, getProfile);
router.put("/me", verifyToken, updateProfile);

export default router;
