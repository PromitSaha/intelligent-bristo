import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

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
    addItem: (
      state,
      action: PayloadAction<{
        item: MenuItem;
        quantity?: number;
      }>
    ) => {
      const existingItem = state.items.find(
        (cartItem) =>
          cartItem.item.id ===
          action.payload.item.id
      );

      if (existingItem) {
        existingItem.quantity +=
          action.payload.quantity || 1;
      } else {
        state.items.push({
          item: action.payload.item,

          quantity:
            action.payload.quantity || 1,
        });
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{
        itemId: string;
        quantity?: number;
      }>
    ) => {
      const existingItem = state.items.find(
        (cartItem) =>
          cartItem.item.id ===
          action.payload.itemId
      );

      if (!existingItem) return;

      existingItem.quantity -=
        action.payload.quantity || 1;

      if (existingItem.quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) =>
            cartItem.item.id !==
            action.payload.itemId
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