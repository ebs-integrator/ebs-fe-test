import React, { createContext, useState, useRef } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import { IProduct } from 'interfaces';
import Products from './pages/Products';
import Cart from 'pages/Cart';

import 'App.css';
import cart from './assets/cart.png';

export const CartContext = createContext<IProduct[]>([]);

const App: React.FC = () => {
  const [added, setAdded] = useState<IProduct[]>([]);
  const history = useHistory();
  const button = useRef<HTMLButtonElement>(null);

  const addToCart = (item: IProduct):IProduct => {
    if(item.quantity) {
      setAdded((prevState) => [...prevState, item]);
    }
    return item;
  };

  const removeFromCart = (itemId: number) => {
    setAdded((added) => added.filter(elem => elem.id !== itemId));
  }

  const showBtn = () => {
    if(button.current) {
      button.current.style.visibility = 'visible'
    }
  }

  const hideBtn = () => {
    if(button.current) {
      history.push('/');
      button.current.style.visibility = 'hidden'
    }
  }

  const substractingQuantity = (list: IProduct[]) => {
    setAdded(list);
  }

  const addingQuantity = (list: IProduct[]) => {
    setAdded(list);
  }

  return (
    <div className="app">
      <div className='navbar'>
        <Link to="/cart" className='link-btn'>
          <button className="cart-btn" onClick={showBtn}>
            <img src={cart} alt="cart" />
          </button>
        </Link>
        <p className='nr-of-added'>{added.length}</p>
        <button 
          className='back-btn' 
          onClick={hideBtn}
          ref={button}>Back</button>
      </div>
      <Switch>
        <Route exact path="/">
          <Products addToCart={addToCart} removeFromCart={removeFromCart}/>
        </Route>
        <Route path="/cart">
          <CartContext.Provider value={added}>
            <Cart 
              showBtn={showBtn} 
              removeFromCart={removeFromCart} 
              substractingQuantity={substractingQuantity}
              addingQuantity={addingQuantity}/>
          </CartContext.Provider>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
