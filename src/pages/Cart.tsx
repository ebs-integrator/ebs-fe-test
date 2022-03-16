import React, { useContext } from "react";

import { CartContext } from "App";
import { IProduct } from "interfaces";

import '../styles/cartStyle.css';
import '../styles/tableStyle.css';

const Cart: React.FC = () => {

    const contextValue = useContext(CartContext);

    return(
        <div className="cart">
            <table className="products-list">
        <thead>
          <tr className="rows">
            <th>Category</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contextValue.length > 0
            ? contextValue.map((item: IProduct, idx: number) => {
                return (
                  <tr key={idx}>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity ? (parseFloat((item.price * item.quantity).toString()).toFixed(2)) : null}</td>
                    <td className='actions'>
                      <button>+</button>
                      <p>{item.quantity ? item.quantity : 0}</p>
                      <button>-</button>
                      <button>Remove</button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
        </div>
    )
}

export default Cart;