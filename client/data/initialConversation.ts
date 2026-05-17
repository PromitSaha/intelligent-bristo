import { ChatMessage }
  from "@/api/types/chat";

export const initialConversation:
  ChatMessage[] = [
    {
      id: "welcome",

      role: "assistant",

      content:
      `🍝 Welcome to Intelligent Bistro.

      Tonight’s kitchen is serving handcrafted Italian favorites — from wood-fired pizzas to fresh pasta and antipasti.

      I can help you:
      • Explore the menu
      • Recommend dishes
      • Build your order naturally
      • Manage your cart conversationally

      What are you craving tonight?`
    }
  ];