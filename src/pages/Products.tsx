import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IProduct } from 'interfaces';

import '../styles/tableStyle.css';
import cart from '../assets/cart.png';

interface IProductsProps {
  addToCart: (item: IProduct) => void;
}

const Products: React.FC<IProductsProps> = ({addToCart}) => {

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

  const substractQuantity = (idx: number) => {
    let tempState = [...products];
    let tempElement = { ...products[idx] }; 
    if(products[idx].quantity) {
      if(tempElement.quantity && tempElement.quantity !== 0) {
        tempElement.quantity = tempElement.quantity - 1
      }
    }
    tempState[idx] = tempElement;
    setProducts(tempState);
  }

  const addQuantity = (idx: number) => {
    let tempState = [...products];
    let tempElement = { ...products[idx] }; 
    if(products[idx].quantity) {
      if(tempElement.quantity) {
        tempElement.quantity = tempElement.quantity + 1
      }
    }
    else {
      tempElement.quantity = 1
    }
    tempState[idx] = tempElement;
    setProducts(tempState);
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
                      <button className='plus-btn' onClick={() => addQuantity(idx)}>+</button>
                      <p>{item.quantity ? item.quantity : 0}</p>
                      <button onClick={() => substractQuantity(idx)}>-</button>
                      <button className='add-to-cart' onClick={() => addToCart(item)}>
                        <img className='cart-img' src={cart} alt="cart" />
                        +
                      </button>
                      <button className='remove-from-cart'>
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
