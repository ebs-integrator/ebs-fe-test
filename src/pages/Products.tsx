import React from 'react';

import productService from 'services/product';
import { CartContext } from 'context/CartContext';
import cartService from 'services/cart';
import IProduct from 'models/IProduct';

const Products: React.FC = () => {
  const [products, setProducts] = React.useState<Array<IProduct>>([]);

  const { setCart } = React.useContext(CartContext);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await productService.getAllProductsAsync();
        setProducts(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Category ^</th>
            <th>Name</th>
            <th>Price ^</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.category.name}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => setCart(cartService.removeFromCart(product))}>(-)</button>
                <span> Select </span>
                <button onClick={() => setCart(cartService.addToCart(product))}>(+)</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
