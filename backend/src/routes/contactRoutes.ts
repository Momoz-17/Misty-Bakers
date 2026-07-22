import { Router } from "express";
import { sendContactMessage } from "../controllers/contactController";

const router = Router();

// Public route — anyone visiting the Contact page can send a message,
// no login required.
router.post("/", sendContactMessage);

export default router;