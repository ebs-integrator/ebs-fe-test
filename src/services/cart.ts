import IProduct from 'models/IProduct';
import ICart from 'models/ICart';

// localStorage.clear();
const CART = 'CART';

const getCart = (): ICart => {
  const cartStorage = localStorage.getItem(CART) ?? JSON.stringify({ products: [] });
  return JSON.parse(cartStorage);
};

const addToCart = (product: IProduct): ICart => {
  const cart: ICart = getCart();

  const existedProduct = cart.products.find((p) => p.id === product.id);

  if (existedProduct) return cart;

  cart.products.push({ ...product, quantity: 1 });

  localStorage.setItem(CART, JSON.stringify(cart));

  return cart;
};

const removeFromCart = (productId: number): ICart => {
  const cart: ICart = getCart();

  cart.products = cart.products.filter((p) => p.id !== productId);

  localStorage.setItem(CART, JSON.stringify(cart));

  return cart;
}

const increaseQuantity = (product: IProduct): ICart => {
  const cart: ICart = getCart();

  const existedProduct = cart.products.find((p) => p.id === product.id);
  if (existedProduct) {
    existedProduct.quantity += 1;
  } else {
    cart.products.push({ ...product, quantity: 1 });
  }

  localStorage.setItem(CART, JSON.stringify(cart));

  return cart;
};

const decreaseQuantity = (productId: number): ICart => {
  const cart: ICart = getCart();

  const existedProduct = cart.products.find((p) => p.id === productId);

  if (!existedProduct) return cart;

  if (existedProduct.quantity > 1) {
    existedProduct.quantity -= 1;
  } else {
    cart.products = cart.products.filter((p) => p.id !== productId);
  }

  localStorage.setItem(CART, JSON.stringify(cart));

  return cart;
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
};
