import { Schema, model, Document } from "mongoose";

export interface ICake extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable: boolean;
  isEggless: boolean;
  weightOptions: string[];
  priceOptions: Map<string, number>;
}

const cakeSchema = new Schema<ICake>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isEggless: { type: Boolean, default: true },
    weightOptions: { type: [String], default: ["500g", "1kg"] },
    priceOptions: {
      type: Map,
      of: Number,
      default: () => new Map([["500g", 600], ["1kg", 1100]])
    }
  },
  { timestamps: true }
);

export const Cake = model<ICake>("Cake", cakeSchema);