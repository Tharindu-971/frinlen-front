export interface Product {
  id: number;
  name: string;
  buyingPrice: number;
  sellingPrice: number;
  quantity: number;
  reOrderLevel: number;
  inStock: boolean;
  status: string;
  isActive: boolean;
}
