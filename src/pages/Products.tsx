import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import { IProduct } from 'interfaces';
import { substractQuantity, addQuantity } from '../functions/changeQuantity';
import { compare, sortArrayDesc } from 'functions/compare';

import '../styles/tableStyle.css';
import cart from '../assets/cart.png';

interface IProductsProps {
  addToCart: (item: IProduct) => IProduct;
  removeFromCart: (id: number) => void;
}

const Products: React.FC<IProductsProps> = ({addToCart, removeFromCart}) => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [createdItems, setCreatedItems] = useState<IProduct[]>([]);

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

  const addingToCart = (item: IProduct) => {
    const createdItem = addToCart(item);
    setCreatedItems([...createdItems, createdItem]);
  }

  const sortByPrice: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const sorted: Array<IProduct> = [...products];
    if(e.currentTarget.className.startsWith('up')) {
      sorted.sort((a, b) => a.price - b.price);
      setProducts(sorted);
    } else {
      sorted.sort((a, b) => b.price - a.price);
      setProducts(sorted);
    }
  }

  const sortByCategory: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const sortedCategory = [...products];
    if(e.currentTarget.className === ('az')) {
      sortedCategory.sort(compare);
      setProducts(sortedCategory);
    } else {
      const lis = sortedCategory.sort(sortArrayDesc);
      setProducts(lis)
    }
  }

  return (
    <div className="products" style={{height: '100%'}}>
      <table className="products-list">
        <thead>
          <tr className="rows">
            <th>
              <button className='az' onClick={sortByCategory}>A-Z</button>
                Category
              <button className='za' onClick={sortByCategory}>Z-A</button>
            </th>
            <th>Name</th>
            <th>
              <button className='up-price' onClick={sortByPrice}>
                <span>&#10095;</span>
              </button>
              Price
              <button className='down-price' onClick={sortByPrice}>
                <span>&#10095;</span>
              </button>
            </th>
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
                      <button className='add-to-cart' onClick={() => addingToCart(item)}>
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
