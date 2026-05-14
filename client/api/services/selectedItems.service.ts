import apiClient from "../client";
import { SelectedItemsResponse } from "../types/selectedItems.types";

export const getSelectedItemsRequest =
  async (): Promise<SelectedItemsResponse> => {

    const response = await apiClient.get(
      "/api/selected-items"
    );

    return response.data;
};