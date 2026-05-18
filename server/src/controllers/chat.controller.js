import {
  processChatMessage,
} from "../services/chat.service.js";

export const chat =
  async (req, res) => {
    try {
      const {
        message,
        cart,
        messages
      } = req.body;

      const response = await processChatMessage({
        message,
        cart,
        messages
      });

      res.status(200).json(response);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        reply:
          "Something went wrong.",
        actions: [],
      });
    }
};