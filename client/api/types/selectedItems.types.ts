export interface SelectedItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface SelectedItemsResponse {
  success: boolean;
  data: SelectedItem[];
}