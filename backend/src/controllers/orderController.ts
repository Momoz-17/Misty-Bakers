import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Order from "../models/Order";
import { sendAdminEmail } from "../config/mailer";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, totalAmount, deliveryAddress, deliveryDate, contactPhone, notes } = req.body;
    const order = await Order.create({
      user: req.user?._id,
      items,
      totalAmount,
      deliveryAddress,
      deliveryDate,
      contactPhone,
      notes,
    });

    // Fire-and-forget: don't let a slow/broken email config delay the
    // order response to the customer.
    const itemsList = items
      .map((it: { quantity: number; name: string; weight: string; price: number }) =>
        `<li>${it.quantity} × ${it.name} (${it.weight}) — ₹${it.price * it.quantity}</li>`
      )
      .join("");

    sendAdminEmail({
      subject: `🎂 New order from ${req.user?.name || "a customer"} — ₹${totalAmount}`,
      html: `
        <h2>New order received!</h2>
        <p><strong>Customer:</strong> ${req.user?.name} (${req.user?.email})</p>
        <p><strong>Phone:</strong> ${contactPhone}</p>
        <p><strong>Delivery address:</strong> ${deliveryAddress}</p>
        <p><strong>Delivery date:</strong> ${new Date(deliveryDate).toLocaleDateString()}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        <h3>Items</h3>
        <ul>${itemsList}</ul>
        <p><strong>Total: ₹${totalAmount}</strong></p>
        <p>Order ID: ${order._id}</p>
      `,
      replyTo: req.user?.email,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order" });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ user: req.user?._id }).sort({ createdAt: -1 });
  res.json(orders);
};

// --- Admin only ---
export const getAllOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find().populate("user", "name email phone").sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};