import apiClient from "../client";

import { CartItem } from "../types/cart";
import { ChatResponse } from "../types/chat";

interface SendChatMessageParams {
  message: string;
  cart: CartItem[];
}

export const sendChatMessage =
  async ({
    message,
    cart,
  }: SendChatMessageParams)
  : Promise<ChatResponse> => {

    const response =
      await apiClient.post(
        "/api/chat",
        {
          message,
          cart,
        }
      );

    return response.data;
};