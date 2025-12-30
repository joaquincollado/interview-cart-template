import { cartReducer, initialState } from './CartReducer';
import { CartActions } from './CartActions';

describe('CartReducer', () => {
  describe('SET_PRODUCTS', () => {
    it('should set products array', () => {
      const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
      ];
      const action = { type: CartActions.SET_PRODUCTS, payload: products };
      const newState = cartReducer(initialState, action);

      expect(newState.products).toEqual(products);
    });
  });

  describe('SET_QUANTITY', () => {
    it('should set product quantity', () => {
      const action = {
        type: CartActions.SET_QUANTITY,
        payload: { productId: 'product1', quantity: 5 },
      };
      const newState = cartReducer(initialState, action);

      expect(newState.selectedProducts).toEqual({ product1: 5 });
    });

    it('should update existing product quantity', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 3 },
      };
      const action = {
        type: CartActions.SET_QUANTITY,
        payload: { productId: 'product1', quantity: 7 },
      };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product1: 7 });
    });

    it('should remove product when quantity is 0', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 3, product2: 2 },
      };
      const action = {
        type: CartActions.SET_QUANTITY,
        payload: { productId: 'product1', quantity: 0 },
      };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product2: 2 });
    });

    it('should remove product when quantity is negative', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 3 },
      };
      const action = {
        type: CartActions.SET_QUANTITY,
        payload: { productId: 'product1', quantity: -1 },
      };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({});
    });
  });

  describe('INCREASE_QUANTITY', () => {
    it('should add product with quantity 1 when not in cart', () => {
      const action = {
        type: CartActions.INCREASE_QUANTITY,
        payload: 'product1',
      };
      const newState = cartReducer(initialState, action);

      expect(newState.selectedProducts).toEqual({ product1: 1 });
    });

    it('should increment quantity when product exists', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 3 },
      };
      const action = {
        type: CartActions.INCREASE_QUANTITY,
        payload: 'product1',
      };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product1: 4 });
    });
  });

  describe('DECREASE_QUANTITY', () => {
    it('should decrement quantity', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 5 },
      };
      const action = {
        type: CartActions.DECREASE_QUANTITY,
        payload: 'product1',
      };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product1: 4 });
    });

    it('should remove product when quantity reaches 1 and decremented', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 1, product2: 3 },
      };
      const action = {
        type: CartActions.DECREASE_QUANTITY,
        payload: 'product1',
      };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product2: 3 });
    });

    it('should handle decreasing non-existent product', () => {
      const action = {
        type: CartActions.DECREASE_QUANTITY,
        payload: 'product1',
      };
      const newState = cartReducer(initialState, action);

      expect(newState.selectedProducts).toEqual({});
    });
  });

  describe('REMOVE_PRODUCT', () => {
    it('should remove product from cart', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 5, product2: 3 },
      };
      const action = { type: CartActions.REMOVE_PRODUCT, payload: 'product1' };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product2: 3 });
    });

    it('should handle removing non-existent product', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 5 },
      };
      const action = { type: CartActions.REMOVE_PRODUCT, payload: 'product2' };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product1: 5 });
    });
  });

  describe('TOGGLE_PRODUCT', () => {
    it('should add product with quantity 1 when not in cart', () => {
      const action = { type: CartActions.TOGGLE_PRODUCT, payload: 'product1' };
      const newState = cartReducer(initialState, action);

      expect(newState.selectedProducts).toEqual({ product1: 1 });
    });

    it('should remove product when already in cart', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 5, product2: 3 },
      };
      const action = { type: CartActions.TOGGLE_PRODUCT, payload: 'product1' };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({ product2: 3 });
    });
  });

  describe('CLEAR_PRODUCTS', () => {
    it('should clear all selected products', () => {
      const state = {
        ...initialState,
        selectedProducts: { product1: 5, product2: 3, product3: 1 },
      };
      const action = { type: CartActions.CLEAR_PRODUCTS };
      const newState = cartReducer(state, action);

      expect(newState.selectedProducts).toEqual({});
    });
  });

  describe('SET_REGISTRATION', () => {
    it('should set registration name', () => {
      const action = {
        type: CartActions.SET_REGISTRATION,
        payload: { field: 'name', value: 'John Doe' },
      };
      const newState = cartReducer(initialState, action);

      expect(newState.registration.name).toBe('John Doe');
      expect(newState.registration.address).toBe('');
    });

    it('should set registration address', () => {
      const action = {
        type: CartActions.SET_REGISTRATION,
        payload: { field: 'address', value: '123 Main St' },
      };
      const newState = cartReducer(initialState, action);

      expect(newState.registration.address).toBe('123 Main St');
      expect(newState.registration.name).toBe('');
    });

    it('should update existing registration field', () => {
      const state = {
        ...initialState,
        registration: { name: 'Jane Doe', address: '456 Oak Ave' },
      };
      const action = {
        type: CartActions.SET_REGISTRATION,
        payload: { field: 'name', value: 'John Smith' },
      };
      const newState = cartReducer(state, action);

      expect(newState.registration.name).toBe('John Smith');
      expect(newState.registration.address).toBe('456 Oak Ave');
    });
  });

  describe('SET_PAYMENT', () => {
    it('should set payment name', () => {
      const action = {
        type: CartActions.SET_PAYMENT,
        payload: { field: 'name', value: 'John Doe' },
      };
      const newState = cartReducer(initialState, action);

      expect(newState.payment.name).toBe('John Doe');
      expect(newState.payment.card).toBe('');
    });

    it('should set payment card', () => {
      const action = {
        type: CartActions.SET_PAYMENT,
        payload: { field: 'card', value: '4111111111111111' },
      };
      const newState = cartReducer(initialState, action);

      expect(newState.payment.card).toBe('4111111111111111');
      expect(newState.payment.name).toBe('');
    });
  });

  describe('RESET_CART', () => {
    it('should reset cart to initial state', () => {
      const state = {
        products: [{ id: '1', name: 'Product 1' }],
        selectedProducts: { product1: 5 },
        registration: { name: 'John Doe', address: '123 Main St' },
        payment: { name: 'John Doe', card: '4111111111111111' },
      };
      const action = { type: CartActions.RESET_CART };
      const newState = cartReducer(state, action);

      expect(newState).toEqual(initialState);
    });
  });

  describe('Unknown action', () => {
    it('should return current state for unknown action', () => {
      const action = { type: 'UNKNOWN_ACTION' };
      const newState = cartReducer(initialState, action);

      expect(newState).toEqual(initialState);
    });
  });
});
