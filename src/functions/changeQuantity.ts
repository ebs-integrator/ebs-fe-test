import { IProduct } from "interfaces";

export const substractQuantity = (idx: number, products: Array<IProduct>):Array<IProduct> => {
    let tempState = [...products];
    let tempElement = { ...products[idx] }; 
    if(products[idx].quantity) {
      if(tempElement.quantity && tempElement.quantity !== 0) {
        tempElement.quantity = tempElement.quantity - 1
      }
    }
    tempState[idx] = tempElement;
    return tempState;
}

export const addQuantity = (idx: number, products: Array<IProduct>):Array<IProduct> => {
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
    return tempState;
}  