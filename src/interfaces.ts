export interface IProducts {
  id: number;
  category: {
    id: string;
    name: string;
  };
  name: string;
  price: number;
}
