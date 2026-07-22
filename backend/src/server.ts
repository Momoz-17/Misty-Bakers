import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import cakeRoutes from "./routes/cakeRoutes";
import orderRoutes from "./routes/orderRoutes";
import contactRoutes from "./routes/contactRoutes";
import dns from 'dns';

dns.setServers(["1.1.1.1","8.8.8.8"]); // Use Cloudflare DNS for faster resolution

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(morgan("dev"));

// --- CONDITIONAL PARSING: ONLY RUN JSON MIDDLEWARE FOR NON-MULTIPART REQUESTS ---
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    return next(); // Pass raw stream straight to the router for multer to catch
  }
  express.json({ limit: "50mb" })(req, res, next);
});

app.use(express.urlencoded({ limit: "50mb", extended: true }));
// -------------------------------------------------------------------------------

// Serve uploaded cake images (e.g. http://localhost:5000/uploads/169...-cake.jpg)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "The Misty Bakers API" }));

app.use("/api/auth", authRoutes);
app.use("/api/cakes", cakeRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🍰 Server running on port ${PORT}`));
});