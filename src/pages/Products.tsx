import React from 'react';

import { CartContext } from 'context/CartContext';
import productService from 'services/product';
import cartService from 'services/cart';
import IProduct from 'models/IProduct';
import ICategory from 'models/ICategory';
import Dropdown from 'components/Dropdown';

const Products: React.FC = () => {
  const [products, setProducts] = React.useState<Array<IProduct>>([]);
  const [categories, setCategories] = React.useState<Array<ICategory>>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<ICategory>();
  const [priceOrder, setPriceOrder] = React.useState<'ASC' | 'DESC'>('ASC');

  const { setCart } = React.useContext(CartContext);

  React.useEffect(() => {
    (async () => {
      try {
        const { data: _products } = await productService.getAllProductsAsync();
        const { data: _categories } = await productService.getAllCategoriesAsync();

        setProducts(_products);
        setCategories(_categories);
      } catch (error) {}
    })();
  }, []);

  const onPriceClick = () => {
    setPriceOrder((prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'));
  };

  return (
    <div>
      <table width="100%">
        <thead>
          <tr>
            <th>
              <Dropdown title="Category" items={categories} onItemSelect={setSelectedCategory} />
            </th>
            <th>Name</th>
            <th>
              <span onClick={onPriceClick}>
                Price
                {priceOrder === 'ASC' ? <span>&uarr;</span> : <span>&darr;</span>}
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((p) => p.category.id === (selectedCategory ? selectedCategory.id : p.category.id))
            .sort((a, b) => (priceOrder === 'ASC' ? a.price - b.price : b.price - a.price))
            .map((product) => (
              <tr key={product.id}>
                <td>{product.category.name}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => setCart(cartService.removeFromCart(product.id))}>(-)</button>
                    <button>Select</button> {/* There is no description what Select do */}
                    <button onClick={() => setCart(cartService.addToCart(product))}>(+)</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
