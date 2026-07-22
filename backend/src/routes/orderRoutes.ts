import { Router } from "express";
import { verifyToken, requireAdmin } from "../middleware/auth";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController";

const router = Router();

router.post("/", verifyToken, createOrder);
router.get("/mine", verifyToken, getMyOrders);

// Admin routes
router.get("/", verifyToken, requireAdmin, getAllOrders);
router.put("/:id/status", verifyToken, requireAdmin, updateOrderStatus);

export default router;
