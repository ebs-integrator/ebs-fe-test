import React, { useContext, useState } from "react";

import { CartContext } from "App";
import { IProduct } from "interfaces";

import '../styles/cartStyle.css';

const Cart: React.FC = () => {

    const contextValue = useContext(CartContext);
    const [listOfAdded, setListOfAdded] = useState(contextValue);

    const removeItem = (itemId: number) => {
      setListOfAdded((listOfAdded) => listOfAdded.filter(elem => elem.id !== itemId));
    }

    return(
        <div className="cart">
            <table className="cart-list">
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
          {listOfAdded.length > 0
            ? listOfAdded.map((item: IProduct, idx: number) => {
                return (
                  <tr key={idx}>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity ? (parseFloat((item.price * item.quantity).toString()).toFixed(2)) : null}</td>
                    <td className='cart-actions'>
                      <button className="plus-btn">+</button>
                      <p>{item.quantity ? item.quantity : 0}</p>
                      <button>-</button>
                      <button className="rem-btn" onClick={() => removeItem(item.id)}>Remove</button>
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