import React, { useContext, useEffect } from "react";

import { CartContext } from "App";
import { IProduct } from "interfaces";
import { addQuantity, substractQuantity } from "functions/changeQuantity";

import '../styles/cartStyle.css';

interface IProps {
  showBtn: () => void;
  removeFromCart: (itemId: number) => void;
  substractingQuantity: (list: IProduct[]) => void;
  addingQuantity: (list: IProduct[]) => void;
}

const Cart: React.FC<IProps> = ({showBtn, removeFromCart, substractingQuantity, addingQuantity}) => {

    const contextValue = useContext(CartContext);

    useEffect(() => {
      showBtn();
    }, [showBtn])

    const subsQuantity = (idx: number) => {
     const list = substractQuantity(idx, contextValue);
     substractingQuantity(list);
    }

    const addsQuantity = (idx: number) => {
      const list = addQuantity(idx, contextValue);
      addingQuantity(list);
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
          {contextValue.length > 0
            ? contextValue.map((item: IProduct, idx: number) => {
                return (
                  <tr key={idx}>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity ? (parseFloat((item.price * item.quantity).toString()).toFixed(2)) : null}</td>
                    <td className='cart-actions'>
                      <button className="plus-btn" onClick={() => addsQuantity(idx)}>+</button>
                      <p>{item.quantity ? item.quantity : 0}</p>
                      <button onClick={() => subsQuantity(idx)}>-</button>
                      <button className="rem-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
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