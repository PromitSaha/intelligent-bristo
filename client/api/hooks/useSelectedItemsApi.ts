import { useState } from "react";

import { getSelectedItemsRequest }
from "../services/selectedItems.service";

import { SelectedItem }
from "../types/selectedItems.types";

export const useSelectedItemsApi = () => {

  const [loading, setLoading] = useState(false);

  const [selectedItems, setSelectedItems] =
    useState<SelectedItem[]>([]);

  const fetchSelectedItems = async () => {

    try {
      setLoading(true);

      const response =
        await getSelectedItemsRequest();

      setSelectedItems(response.data);

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    selectedItems,
    fetchSelectedItems,
  };
};