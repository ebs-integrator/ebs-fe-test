import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './styles/index.css';
import { CartContext } from 'context/CartContext';
import cartService from 'services/cart';
import Products from 'pages/Products';
import Cart from 'pages/Cart';
import Header from 'components/Header';
import ICart from 'models/ICart';

const App: React.FC = () => {
  const [cart, setCart] = React.useState<ICart>({ products: [] });

  React.useEffect(() => {
    (async () => {
      setCart(cartService.getCart());
    })();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Header />
      <hr />
      <Switch>
        <Route path="/products">
          <Products />
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
