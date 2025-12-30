import { createContext, useReducer, useMemo, useContext } from 'react';
import { cartReducer, initialState } from './CartReducer';

export const CartContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
