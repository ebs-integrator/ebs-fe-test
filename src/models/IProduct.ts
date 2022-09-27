export default interface IProduct {
  id: number;
  name: string;
  price: number;
  category: ICategory;
}

interface ICategory {
  id: string;
  name: string;
}
