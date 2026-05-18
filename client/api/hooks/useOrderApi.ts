import { useState } from "react";

import { CartItem } from "../types/cart";
import { OrderResponse } from "../types/order";
import { placeOrderRequest } from "../services/order.service";

export const useOrderApi = () => {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const placeOrder =
    async (
      cart: CartItem[]
    ): Promise<OrderResponse> => {
      try {
        setLoading(true);

        return await placeOrderRequest(cart);
      } finally {
        setLoading(false);
      }
    };

  return {
    loading,
    placeOrder,
  };
};
