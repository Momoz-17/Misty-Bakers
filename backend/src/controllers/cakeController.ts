import { Request, Response } from "express";
import { Cake } from "../models/Cake";

interface WeightPrice {
  weight: string;
  price: number;
}

// The frontend sends the uploaded file's public URL by building it here,
// since multer disk storage only gives us the filename on disk.
const buildImageUrl = (req: Request, filename: string) =>
  `${req.protocol}://${req.get("host")}/uploads/${filename}`;

// The frontend sends weight/price tiers as a JSON string in the
// "weightPrices" field, e.g. '[{"weight":"500g","price":600}, ...]'
const parseWeightPrices = (raw: unknown): WeightPrice[] => {
  if (!raw) return [];
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((wp) => ({ weight: String(wp.weight).trim(), price: Number(wp.price) }))
      .filter((wp) => wp.weight && !Number.isNaN(wp.price));
  } catch {
    return [];
  }
};

export const getCakes = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const filter: Record<string, unknown> = { isAvailable: true };
    if (category) filter.category = category;

    const cakes = await Cake.find(filter).sort({ createdAt: -1 });
    res.json(cakes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cakes", error });
  }
};

export const getCakeById = async (req: Request, res: Response) => {
  try {
    const cake = await Cake.findById(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json(cake);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cake details", error });
  }
};

// --- Admin only ---
export const createCake = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Please choose a cake image" });
    }

    const weightPrices = parseWeightPrices(req.body.weightPrices);
    if (weightPrices.length === 0) {
      return res
        .status(400)
        .json({ message: "Please add at least one weight & price tier" });
    }

    const weightOptions = weightPrices.map((wp) => wp.weight);
    const priceOptions: Record<string, number> = {};
    weightPrices.forEach((wp) => {
      priceOptions[wp.weight] = wp.price;
    });

    const cake = await Cake.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      isEggless: req.body.isEggless === "true" || req.body.isEggless === true,
      weightOptions,
      priceOptions,
      price: weightPrices[0].price, // base/display price
      imageUrl: buildImageUrl(req, file.filename),
    });

    res.status(201).json(cake);
  } catch (error) {
    console.error("Create cake error:", error);
    res.status(400).json({
      message: "Failed to create cake",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const updateCake = async (req: Request, res: Response) => {
  try {
    const existing = await Cake.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Cake not found" });

    const updates: Record<string, unknown> = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      isEggless: req.body.isEggless === "true" || req.body.isEggless === true,
    };

    const weightPrices = parseWeightPrices(req.body.weightPrices);
    if (weightPrices.length > 0) {
      const priceOptions: Record<string, number> = {};
      weightPrices.forEach((wp) => {
        priceOptions[wp.weight] = wp.price;
      });
      updates.weightOptions = weightPrices.map((wp) => wp.weight);
      updates.priceOptions = priceOptions;
      updates.price = weightPrices[0].price;
    }

    // Only replace the image if a new one was uploaded — otherwise keep the
    // existing one (the frontend doesn't require re-uploading on every edit).
    if (req.file) {
      updates.imageUrl = buildImageUrl(req, req.file.filename);
    }

    const cake = await Cake.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(cake);
  } catch (error) {
    console.error("Update cake error:", error);
    res.status(400).json({
      message: "Failed to update cake",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteCake = async (req: Request, res: Response) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) return res.status(404).json({ message: "Cake not found" });
    res.json({ message: "Cake removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete cake", error });
  }
};