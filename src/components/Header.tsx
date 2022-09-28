import React from 'react';

import { CartContext } from 'context/CartContext';

const Header: React.FC = () => {
  return (
    <CartContext.Consumer>
      {({ cart }) => <div>Products in cart ({cart.products.reduce((init, curr) => init + curr.quantity, 0)})</div>}
    </CartContext.Consumer>
  );
};

export default Header;
