import {
  createOrder,
} from "../services/order.service.js";

export const placeOrder =
  async (req, res) => {
    try {
      const {
        cart,
      } = req.body;

      const order = createOrder(cart);

      res.status(201).json(order);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        success: false,
        message:
          error.message ||
          "Unable to place order.",
      });
    }
  };
