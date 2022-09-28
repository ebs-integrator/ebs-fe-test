import IProduct from './IProduct';

export default interface ICart {
  products: Array<IProduct & { quantity: number }>;
}
