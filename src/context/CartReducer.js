import { CartActions } from './CartActions';

const STORAGE_KEY = 'cart-state';

export const initialState = {
  products: [],
  selectedProducts: [],
  registration: {
    name: '',
    address: '',
  },
  payment: {
    name: '',
    card: '',
  },
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case CartActions.SET_PRODUCTS:
      return { ...state, products: action.payload };
    case CartActions.TOGGLE_PRODUCT:
      const id = action.payload;
      const exists = state.selectedProducts.includes(id);
      return {
        ...state,
        selectedProducts: exists
          ? state.selectedProducts.filter((productId) => productId !== id)
          : [...state.selectedProducts, id],
      };
    case CartActions.CLEAR_PRODUCTS:
      return { ...state, selectedProducts: [] };
    case CartActions.SET_REGISTRATION:
      return {
        ...state,
        registration: {
          ...state.registration,
          [action.payload.field]: action.payload.value,
        },
      };
    case CartActions.SET_PAYMENT:
      return {
        ...state,
        payment: {
          ...state.payment,
          [action.payload.field]: action.payload.value,
        },
      };
    case CartActions.RESET_CART:
      sessionStorage.removeItem(STORAGE_KEY);
      return initialState;
    default:
      return state;
  }
};
