import { CartActions } from './CartActions';

export const initialState = {
  products: [],
  selectedProducts: [],
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
    default:
      return state;
  }
};
