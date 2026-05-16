import {
  addItem,
  removeItem,
  clearCart,
} from "@/store/slices/cartSlice";

import { MenuItem }
  from "@/api/types/menu";

export const processChatActions = (
  actions: any[],
  dispatch: any,
  menu: MenuItem[]
) => {

  actions.forEach((action) => {

    switch (action.type) {

      case "ADD_ITEM": {

        const menuItem = menu.find(
          (item) => item.id === action.itemId
        );

        if (!menuItem) {

          console.warn(
            "Menu item not found:",
            action.itemId
          );

          return;
        }

        dispatch(
          addItem({
            item: menuItem,

            quantity:
              action.quantity || 1,
          })
        );

        break;
      }

      case "REMOVE_ITEM": {

        dispatch(
          removeItem({
            itemId: action.itemId,

            quantity:
              action.quantity || 1,
          })
        );

        break;
      }

      case "CLEAR_CART": {

        dispatch(clearCart());

        break;
      }

      default:

        console.warn(
          "Unknown action:",
          action
        );
    }
  });
};