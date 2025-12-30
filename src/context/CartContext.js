import {
  createContext,
  useReducer,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { cartReducer, initialState } from './CartReducer';

const STORAGE_KEY = 'cart-state';

const loadState = () => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveState = (state) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

export const CartContext = createContext({
  state: initialState,
  dispatch: () => {},
});

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, (base) => {
    const persisted = loadState();
    return persisted ? { ...base, ...persisted } : base;
  });
  useEffect(() => {
    saveState({
      selectedProducts: state.selectedProducts,
      registration: state.registration,
      payment: state.payment,
    });
  }, [state.selectedProducts, state.registration, state.payment]);
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
