export const handleChatMessage = (
  message,
  cart
) => {

  const lower =
    message.toLowerCase();

  if (
    lower.includes("burger")
  ) {
    return {
      reply:
        "Added 2 spicy burgers to your cart.",

      actions: [
        {
          type: "ADD_ITEM",

          itemId:
            "550e8400-e29b-41d4-a716-446655440007",

          quantity: 2,
        },
      ],
    };
  }

  if (
    lower.includes("clear")
  ) {
    return {
      reply:
        "Your cart has been cleared.",

      actions: [
        {
          type: "CLEAR_CART",
        },
      ],
    };
  }

  return {
    reply:
      "I couldn't understand that request.",

    actions: [],
  };
};