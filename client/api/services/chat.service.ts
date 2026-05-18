import apiClient from "../client";

import { CartItem } from "../types/cart";
import { ChatMessage, ChatResponse } from "../types/chat";

interface SendChatMessageParams {
  message: string;
  cart: CartItem[];
  messages: ChatMessage[]
}

export const sendChatMessage =
  async ({
    message,
    cart,
    messages
  }: SendChatMessageParams)
  : Promise<ChatResponse> => {

    const response =
      await apiClient.post(
        "/api/chat",
        {
          message,
          cart,
          messages,
        }
      );

    return response.data;
};