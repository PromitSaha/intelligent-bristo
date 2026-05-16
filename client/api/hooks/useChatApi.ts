import { useState } from "react";

import {
  ChatResponse,
} from "../types/chat";

import {
  sendChatMessage,
} from "../services/chat.service";

import {
  CartItem,
} from "../types/cart";

export const useChatApi = () => {
  const [loading, setLoading] =
    useState(false);

  const sendMessage = async (
    message: string,
    cart: CartItem[]
  ): Promise<ChatResponse> => {
    try {
      setLoading(true);

      const data =
        await sendChatMessage({
          message,
          cart,
        });

      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    sendMessage,
  };
};