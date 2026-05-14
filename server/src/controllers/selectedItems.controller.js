import { fetchSelectedItems } from "../services/selectedItems.service.js";

export const getSelectedItems = async (req, res) => {
  try {
    const items = await fetchSelectedItems();

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch selected items",
    });
  }
};