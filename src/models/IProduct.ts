import ICategory from "./ICategory";

export default interface IProduct {
  id: number;
  name: string;
  price: number;
  category: ICategory;
}