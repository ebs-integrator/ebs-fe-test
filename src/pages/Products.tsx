import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IProduct } from 'interfaces';
import { substractQuantity, addQuantity } from '../functions/changeQuantity';

import '../styles/tableStyle.css';
import cart from '../assets/cart.png';

interface IProductsProps {
  addToCart: (item: IProduct) => void;
  removeFromCart: (id: number) => void;
}

const Products: React.FC<IProductsProps> = ({addToCart, removeFromCart}) => {

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/api/products').then((result: any) => {
        if (result.data.length > 0) {
          result.data.forEach((product: IProduct) => {
            setProducts((prevState) => [...prevState, product]);
          });
        }
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  const subsQuantity = (idx: number) => {
    const list = substractQuantity(idx, products)
    setProducts(list);
  }


  const addingQuantity = (idx: number) => {
    const list = addQuantity(idx, products);
    setProducts(list);
  }

  return (
    <div className="products" style={{height: '100%'}}>
      <table className="products-list">
        <thead>
          <tr className="rows">
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0
            ? products.map((item: IProduct, idx: number) => {
                return (
                  <tr key={idx}>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td className='actions'>
                      <button className='plus-btn' onClick={() => addingQuantity(idx)}>+</button>
                      <p>{item.quantity ? item.quantity : 0}</p>
                      <button onClick={() => subsQuantity(idx)}>-</button>
                      <button className='add-to-cart' onClick={() => addToCart(item)}>
                        <img className='cart-img' src={cart} alt="cart" />
                        +
                      </button>
                      <button className='remove-from-cart' onClick={() => removeFromCart(item.id)}>
                        <img className='cart-img-rem' src={cart} alt="cart" />
                        -
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
