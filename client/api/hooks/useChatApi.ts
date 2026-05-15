import { useState } from "react";

import { ChatResponse }
  from "../types/chat";

import {
  sendChatMessageRequest,
} from "../services/chat.service";

export const useChatApi = () => {
  const [loading, setLoading] =
    useState(false);

  const sendMessage = async (
    message: string,
    cart: any[]
  ): Promise<ChatResponse> => {
    try {
      setLoading(true);

      const data =
        await sendChatMessageRequest(
          message,
          cart
        );

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