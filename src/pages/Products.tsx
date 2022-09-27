import React from 'react';

import productsService from 'services/products';
import IProduct from 'models/IProduct';

const Products: React.FC = () => {
  const [products, setProducts] = React.useState<Array<IProduct>>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await productsService.getAllProducts();
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
            <tr>
              <td>{product.category.name}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>(-) Select (+)</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
