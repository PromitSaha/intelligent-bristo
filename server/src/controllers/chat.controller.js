import { handleChatMessage }
  from "../services/chat.service.js";

export const processChat = (req, res) => {
  const { message, cart } = req.body;

  const result = handleChatMessage(
    message,
    cart
  );

  res.status(200).json(result);
};