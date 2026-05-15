import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MenuItem } from "@/api/types/menu";
import { CartItem } from "@/api/types/cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<MenuItem>) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem.item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          item: action.payload,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem.item.id === action.payload
      );

      if (!existingItem) return;

      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (cartItem) => cartItem.item.id !== action.payload
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;