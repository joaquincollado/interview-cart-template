import { CartActions } from './CartActions';

const STORAGE_KEY = 'cart-state';

export const initialState = {
  products: [],
  selectedProducts: {},
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
    case CartActions.SET_QUANTITY:
      const { productId, quantity } = action.payload;
      const newSelectedProducts = { ...state.selectedProducts };
      if (quantity <= 0) {
        delete newSelectedProducts[productId];
      } else {
        newSelectedProducts[productId] = quantity;
      }
      return {
        ...state,
        selectedProducts: newSelectedProducts,
      };
    case CartActions.INCREASE_QUANTITY:
      return {
        ...state,
        selectedProducts: {
          ...state.selectedProducts,
          [action.payload]: (state.selectedProducts[action.payload] || 0) + 1,
        },
      };
    case CartActions.DECREASE_QUANTITY:
      const currentQty = state.selectedProducts[action.payload] || 0;
      if (currentQty <= 1) {
        const { [action.payload]: removed, ...rest } = state.selectedProducts;
        return { ...state, selectedProducts: rest };
      }
      return {
        ...state,
        selectedProducts: {
          ...state.selectedProducts,
          [action.payload]: currentQty - 1,
        },
      };
    case CartActions.REMOVE_PRODUCT:
      const { [action.payload]: removed, ...remaining } =
        state.selectedProducts;
      return { ...state, selectedProducts: remaining };
    case CartActions.TOGGLE_PRODUCT:
      const id = action.payload;
      const exists = state.selectedProducts[id];
      const updated = { ...state.selectedProducts };
      if (exists) {
        delete updated[id];
      } else {
        updated[id] = 1;
      }
      return {
        ...state,
        selectedProducts: updated,
      };
    case CartActions.CLEAR_PRODUCTS:
      return { ...state, selectedProducts: {} };
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
