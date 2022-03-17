import React, { useContext, useEffect, useState } from "react";

import { CartContext } from "App";
import { IProduct } from "interfaces";
import { addQuantity, substractQuantity } from "functions/changeQuantity";

import '../styles/cartStyle.css';

interface IProps {
  showBtn: () => void;
}

const Cart: React.FC<IProps> = ({showBtn}) => {

    const contextValue = useContext(CartContext);
    const [listOfAdded, setListOfAdded] = useState(contextValue);

    const removeItem = (itemId: number) => {
      setListOfAdded((listOfAdded) => listOfAdded.filter(elem => elem.id !== itemId));
    }

    useEffect(() => {
      showBtn();
    }, [showBtn])

    const subsQuantity = (idx: number) => {
     const list = substractQuantity(idx, listOfAdded);
     setListOfAdded(list);
    }

    const addingQuantity = (idx: number) => {
      const list = addQuantity(idx, listOfAdded);
      setListOfAdded(list);
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
                      <button className="plus-btn" onClick={() => addingQuantity(idx)}>+</button>
                      <p>{item.quantity ? item.quantity : 0}</p>
                      <button onClick={() => subsQuantity(idx)}>-</button>
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