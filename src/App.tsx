import React, { createContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { IProduct } from 'interfaces';
import Products from './pages/Products';
import Cart from 'pages/Cart';

export const CartContext = createContext<IProduct[]>([]);

const App: React.FC = () => {

  const [added, setAdded] = useState<IProduct[]>([]);

  const addToCart = (item: IProduct) => {
    setAdded((prevState) => [...prevState, item])
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
          <Products addToCart={addToCart} />
        </Route>
        <Route path='/cart'>
          <CartContext.Provider value={added}>
            <Cart />
          </CartContext.Provider>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
