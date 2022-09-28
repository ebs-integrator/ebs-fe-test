import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CartContext } from 'context/CartContext';

const Header: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="actions">
      <CartContext.Consumer>
        {({ cart }) => (
          <h3>
            The cart contains products of amount{' '}
            {cart.products.reduce((accum, curr) => accum + curr.quantity * curr.price, 0).toFixed(2)}
          </h3>
        )}
      </CartContext.Consumer>

      <Link to={pathname === '/products' ? '/cart' : 'products'}>
        Go to {pathname === '/products' ? 'Cart' : 'Products'}
      </Link>
    </div>
  );
};

export default Header;
