import React from 'react';

import { CartContext } from 'context/CartContext';
import cartService from 'services/cart';

const Cart: React.FC = () => {
  const { setCart } = React.useContext(CartContext);

  return (
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <CartContext.Consumer>
            {({ cart }) =>
              cart.products.map((product) => (
                <tr key={product.id}>
                  <td>{product.category.name}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{(product.quantity * product.price).toFixed(2)}</td>
                  <td>
                    <div className="actions">
                      <button onClick={() => setCart(cartService.decreaseQuantity(product.id))}>(-)</button>
                      <button onClick={() => setCart(cartService.removeFromCart(product.id))}>Remove</button>
                      <button onClick={() => setCart(cartService.increaseQuantity(product))}>(+)</button>
                    </div>
                  </td>
                </tr>
              ))
            }
          </CartContext.Consumer>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
