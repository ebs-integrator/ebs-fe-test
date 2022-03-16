export interface IProduct {
  quantity?: number;
  id: number;
  category: {
    id: string;
    name: string;
  };
  name: string;
  price: number;
}
