import React from 'react';

import ICart from 'models/ICart';

export const CartContext = React.createContext({
  cart: {} as ICart,
  setCart: (cart: ICart) => {},
});
