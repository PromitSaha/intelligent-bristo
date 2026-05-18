import {
  calculateKitchenTime,
} from "../utils/calculateKitchenTime.js";

export const createOrder = (
  cartItems = []
) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    const error = new Error("Cart is empty.");
    error.statusCode = 400;

    throw error;
  }

  const items = cartItems.map((cartItem) => {
    const quantity =
      Number(cartItem.quantity || 0);

    if (!cartItem.item || quantity <= 0) {
      const error = new Error("Invalid cart item.");
      error.statusCode = 400;

      throw error;
    }

    return {
      item: cartItem.item,
      quantity,
      lineTotal:
        Number(
          (
            cartItem.item.price *
            quantity
          ).toFixed(2)
        ),
    };
  });

  const subtotal = items.reduce(
    (total, cartItem) =>
      total + cartItem.lineTotal,
    0
  );

  const estimatedKitchenTime = calculateKitchenTime(items);

  return {
    orderId: `IB-${Date.now().toString().slice(-6)}`,
    items,
    subtotal: Number(subtotal.toFixed(2)),
    estimatedKitchenTime,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
};
