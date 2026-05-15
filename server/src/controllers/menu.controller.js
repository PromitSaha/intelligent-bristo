import {
  getMenuItems,
} from "../services/menu.service.js";

export const fetchMenu = (req, res) => {
  const items = getMenuItems();

  res.status(200).json(items);
};