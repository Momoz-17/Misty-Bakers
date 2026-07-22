import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";
import User, { IUser } from "../models/User";

export interface AuthRequest extends Request {
  user?: IUser;
}

// Verifies the Firebase ID token sent from the frontend (Authorization: Bearer <token>)
// and attaches the matching MongoDB user document to the request.
export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No auth token provided" });
    }

    const idToken = authHeader.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    // Auto-create the user profile on first successful Google login
    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name || "New User",
        email: decoded.email || "",
        photoURL: decoded.picture || "",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
