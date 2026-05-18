import { CartItem } from "./cart";

export interface OrderItem extends CartItem {
  lineTotal: number;
}

export interface OrderResponse {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  estimatedKitchenTime: number;
  status: "confirmed";
  createdAt: string;
}
