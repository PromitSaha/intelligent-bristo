export interface ChatMessage {
  id: string;

  role: "user" | "assistant";

  content: string;
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
}