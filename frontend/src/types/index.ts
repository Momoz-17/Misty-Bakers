export interface Cake {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isAvailable?: boolean;
  isEggless: boolean;
  rating?: number;
  
  // Add these missing fields:
  weightOptions: string[];
  priceOptions: Record<string, number>; 
  
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  cake: Cake;
  quantity: number;
  weight: string;
}

export interface UserProfile {
  _id: string;
  firebaseUid: string;
  name: string;
  email: string;
  photoURL?: string;
  phone?: string;
  address?: string;
  role: "customer" | "admin";
}

export interface Order {
  _id: string;
  items: {
    cake: string;
    name: string;
    quantity: number;
    weight: string;
    price: number;
  }[];
  totalAmount: number;
  deliveryAddress: string;
  deliveryDate: string;
  contactPhone: string;
  status: "pending" | "confirmed" | "preparing" | "out-for-delivery" | "delivered" | "cancelled";
  createdAt: string;
}
