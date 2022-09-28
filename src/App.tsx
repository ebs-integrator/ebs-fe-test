import React from 'react';

import './styles/index.css';
import { CartContext } from 'context/CartContext';
import cartService from 'services/cart';
import Products from 'pages/Products';
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
      <Products />
    </CartContext.Provider>
  );
};

export default App;
