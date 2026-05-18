import { useState }
  from "react";

import {
  ChatMessage,
  ChatResponse,
} from "../types/chat";

import {
  sendChatMessage,
} from "../services/chat.service";

export const useChatApi = () => {

  const [
    loading,
    setLoading,
  ] = useState(false);

  const sendMessage = async (
    message: string,
    cart: any[],
    messages: ChatMessage[]
  ): Promise<ChatResponse> => {

    try {

      setLoading(true);

      const data =
        await sendChatMessage({
          message,
          cart,
          messages,
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