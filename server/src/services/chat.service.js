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
    messages
  }) => {
    const menu =
      getMenuItems();
      
    const openAIMessages = [
      {
        role: "system",

        content:
          buildSystemPrompt(
            menu,
            cart
          ),
      },

      ...messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),

      {
        role: "user",
        content: message,
      },
    ];

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4o-mini",

        response_format: {
          type: "json_object",
        },

        messages: openAIMessages,
      });

    const content =
      completion
        .choices[0]
        .message
        .content;

    const response =
      JSON.parse(content);

    const validMenuItemIds =
      new Set(
        menu.map((item) => item.id)
      );

    return {
      reply:
        response.reply || "",

      actions:
        Array.isArray(response.actions)
          ? response.actions
          : [],

      suggestedItems:
        Array.isArray(response.suggestedItems)
          ? response.suggestedItems.filter(
              (suggestedItem) =>
                validMenuItemIds.has(
                  suggestedItem.itemId
                )
            )
          : [],
    };
};
