import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './styles/index.css';
import { CartContext } from 'context/CartContext';
import productService from 'services/product';
import cartService from 'services/cart';
import Products from 'pages/Products';
import Cart from 'pages/Cart';
import Header from 'components/Header';
import IProduct from 'models/IProduct';
import ICategory from 'models/ICategory';
import ICart from 'models/ICart';

const App: React.FC = () => {
  const [products, setProducts] = React.useState<Array<IProduct>>([]);
  const [categories, setCategories] = React.useState<Array<ICategory>>([]);
  const [cart, setCart] = React.useState<ICart>({ products: [] });

  React.useEffect(() => {
    (async () => {
      try {
        const { data: _products } = await productService.getAllProductsAsync();
        const { data: _categories } = await productService.getAllCategoriesAsync();

        setCart(cartService.getCart());
        setProducts(_products);
        setCategories(_categories);
      } catch (error) {}
    })();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Header />
      <hr />
      <Switch>
        <Route path="/products">
          <Products products={products} categories={categories} />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/">
          <Redirect to="/products" />
        </Route>
      </Switch>
    </CartContext.Provider>
  );
};

export default App;
