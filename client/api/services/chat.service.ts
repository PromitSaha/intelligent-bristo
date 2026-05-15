import apiClient from "../client";

export const sendChatMessageRequest =
  async (
    message: string,
    cart: any[]
  ) => {

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