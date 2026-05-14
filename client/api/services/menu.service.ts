import apiClient from "../client";

export const getMenuRequest = async () => {
  const response = await apiClient.get("/api/menu");

  return response.data;
};