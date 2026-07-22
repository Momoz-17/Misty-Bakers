import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import User from "../models/User";

// Returns (or lazily creates, handled in middleware) the logged-in user's profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  res.json(req.user);
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, address } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user?._id,
      { name, phone, address },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
