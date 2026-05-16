import openai
  from "../lib/openai.js";

import { buildSystemPrompt }
  from "../prompts/chat.prompt.js";

import {
  getMenuItems,
} from "./menu.service.js";

export const processChatMessage =
  async ({
    message,
    cart,
  }) => {

    const menu =
      getMenuItems();

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        response_format: {
          type: "json_object",
        },

        messages: [
          {
            role: "system",

            content:
              buildSystemPrompt(
                menu,
                cart
              ),
          },

          {
            role: "user",
            content: message,
          },
        ],
      });

    const content =
      completion
        .choices[0]
        .message
        .content;

    return JSON.parse(content);
};