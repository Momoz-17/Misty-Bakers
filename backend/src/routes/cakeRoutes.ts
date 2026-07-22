import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { verifyToken, requireAdmin } from "../middleware/auth";
import {
  getCakes,
  getCakeById,
  createCake,
  updateCake,
  deleteCake,
} from "../controllers/cakeController";

// Cake images are saved to backend/uploads and served statically from
// /uploads (see server.ts). Create the folder on startup if it's missing.
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const router = Router();

router.get("/", getCakes);
router.get("/:id", getCakeById);

// Admin routes — upload.single("image") must match the FormData field name
// the frontend appends the file under ("image" in ManageCakes.tsx).
router.post("/", verifyToken, requireAdmin, upload.single("image"), createCake);
router.put("/:id", verifyToken, requireAdmin, upload.single("image"), updateCake);
router.delete("/:id", verifyToken, requireAdmin, deleteCake);

export default router;