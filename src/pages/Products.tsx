import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { IProducts } from 'interfaces';

import '../styles/tableStyle.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    try {
      axios.get('http://localhost:3001/api/products').then((result: any) => {
        if (result.data.length > 0) {
          result.data.forEach((product: IProducts) => {
            setProducts((prevState) => [...prevState, product]);
          });
        }
      });
    } catch (error) {
      console.log('error: ', error);
    }
  }, []);

  return (
    <div className="products">
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
            ? products.map((item: IProducts, idx: number) => {
                return (
                  <tr key={idx}>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>+</td>
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
