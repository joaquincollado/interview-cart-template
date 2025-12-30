import { getSelectedProducts, getTotalItems } from './CartSelectors';

describe('CartSelectors', () => {
  describe('getSelectedProducts', () => {
    it('should return empty array when no products selected', () => {
      const state = {
        products: [
          { id: 'product1', name: 'First Product' },
          { id: 'product2', name: 'Second Product' },
        ],
        selectedProducts: {},
      };

      const result = getSelectedProducts(state);
      expect(result).toEqual([]);
    });

    it('should return selected products with quantities', () => {
      const state = {
        products: [
          { id: 'product1', name: 'First Product' },
          { id: 'product2', name: 'Second Product' },
          { id: 'product3', name: 'Third Product' },
        ],
        selectedProducts: {
          product1: 2,
          product3: 5,
        },
      };

      const result = getSelectedProducts(state);
      expect(result).toEqual([
        { id: 'product1', name: 'First Product', quantity: 2 },
        { id: 'product3', name: 'Third Product', quantity: 5 },
      ]);
    });

    it('should handle single product selection', () => {
      const state = {
        products: [{ id: 'product1', name: 'First Product' }],
        selectedProducts: {
          product1: 1,
        },
      };

      const result = getSelectedProducts(state);
      expect(result).toEqual([
        { id: 'product1', name: 'First Product', quantity: 1 },
      ]);
    });

    it('should filter out products not in product list', () => {
      const state = {
        products: [{ id: 'product1', name: 'First Product' }],
        selectedProducts: {
          product1: 2,
          product2: 3,
        },
      };

      const result = getSelectedProducts(state);
      expect(result).toEqual([
        { id: 'product1', name: 'First Product', quantity: 2 },
      ]);
    });
  });

  describe('getTotalItems', () => {
    it('should return 0 when no products selected', () => {
      const state = {
        selectedProducts: {},
      };

      const result = getTotalItems(state);
      expect(result).toBe(0);
    });

    it('should sum all quantities', () => {
      const state = {
        selectedProducts: {
          product1: 2,
          product2: 3,
          product3: 5,
        },
      };

      const result = getTotalItems(state);
      expect(result).toBe(10);
    });

    it('should handle single product', () => {
      const state = {
        selectedProducts: {
          product1: 7,
        },
      };

      const result = getTotalItems(state);
      expect(result).toBe(7);
    });
  });
});
