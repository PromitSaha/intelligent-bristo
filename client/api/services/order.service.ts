import apiClient from "../client";

import { CartItem } from "../types/cart";
import { OrderResponse } from "../types/order";

export const placeOrderRequest =
  async (
    cart: CartItem[]
  ): Promise<OrderResponse> => {
    const response =
      await apiClient.post(
        "/api/orders",
        {
          cart,
        }
      );

    return response.data;
  };
