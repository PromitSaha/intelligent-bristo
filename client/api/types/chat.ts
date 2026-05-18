export interface ChatMessage {
  id: string;

  role: "user" | "assistant";

  content: string;

  suggestedItems?: ChatSuggestedItem[];
}

export interface ChatAction {
  type:
    | "ADD_ITEM"
    | "REMOVE_ITEM"
    | "CLEAR_CART";

  itemId?: string;

  quantity?: number;
}

export interface ChatResponse {
  reply: string;

  actions: ChatAction[];

  suggestedItems?: ChatSuggestedItem[];
}

export interface ChatSuggestedItem {
  itemId: string;
}
