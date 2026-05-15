import { ChatMessage }
  from "@/api/types/chat";

export const initialConversation:
  ChatMessage[] = [
    {
      id: "welcome_1",

      role: "assistant",

      content:
        "Welcome to Intelligent Bistro.\n\nYou can ask for recommendations, add items naturally, or explore the menu.",
    },
  ];