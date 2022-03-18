import { IProduct } from "interfaces";

export const compare = (a: IProduct, b: IProduct) => {
    if ( a.category.name < b.category.name ){
        return -1;
      }
      if ( a.category.name > b.category.name ){
        return 1;
      }
      return 0;
}

export const sortArrayDesc = (x: IProduct, y: IProduct) => {
    if(x.category.name > y.category.name) {
        return -1
    }
    if(x.category.name < y.category.name) {
        return 1
    } return 0
}