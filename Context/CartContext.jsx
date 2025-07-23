import React, { createContext, useEffect, useState } from 'react';
export const CartCh = createContext()
const CartContext = ({children}) => {
  const [cartChange  , setCartChange] = useState(false)

  return <CartCh.Provider value={{cartChange ,setCartChange }}>{children}</CartCh.Provider>


}

export default CartContext;
