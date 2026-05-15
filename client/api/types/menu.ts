export interface MenuItem {
  id: string;
  name: string;
  shortDetails: string;
  ingredients: string[];
  spiceLevel: "Mild" | "Medium" | "Hot";
  preparationTime: string;
  price: number;
  category: string;
}