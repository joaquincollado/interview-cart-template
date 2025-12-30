import { render, screen, fireEvent } from '@testing-library/react';
import ProductsList from './ProductsList';
import { CartContext } from '../context/CartContext';

const mockDispatch = jest.fn();

const createMockContext = (selectedProducts = {}) => ({
  state: { selectedProducts },
  dispatch: mockDispatch,
});

const mockProducts = [
  { id: 'product1', name: 'First Product' },
  { id: 'product2', name: 'Second Product' },
  { id: 'product3', name: 'Third Product' },
];

describe('ProductsList', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should render all products', () => {
    const context = createMockContext();
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    expect(screen.getByText('First Product')).toBeInTheDocument();
    expect(screen.getByText('Second Product')).toBeInTheDocument();
    expect(screen.getByText('Third Product')).toBeInTheDocument();
  });

  it('should show "Add to Cart" button for products not in cart', () => {
    const context = createMockContext();
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    const addButtons = screen.getAllByText('Add to Cart');
    expect(addButtons).toHaveLength(3);
  });

  it('should dispatch INCREASE_QUANTITY when clicking "Add to Cart"', () => {
    const context = createMockContext();
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    const addButtons = screen.getAllByText('Add to Cart');
    fireEvent.click(addButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'INCREASE_QUANTITY',
      payload: 'product1',
    });
  });

  it('should show quantity controls for products in cart', () => {
    const context = createMockContext({ product1: 3 });
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByLabelText('Decrease quantity')).toBeInTheDocument();
    expect(screen.getByLabelText('Increase quantity')).toBeInTheDocument();
  });

  it('should dispatch INCREASE_QUANTITY when clicking + button', () => {
    const context = createMockContext({ product1: 3 });
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    const increaseButton = screen.getByLabelText('Increase quantity');
    fireEvent.click(increaseButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'INCREASE_QUANTITY',
      payload: 'product1',
    });
  });

  it('should dispatch DECREASE_QUANTITY when clicking - button', () => {
    const context = createMockContext({ product1: 3 });
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    const decreaseButton = screen.getByLabelText('Decrease quantity');
    fireEvent.click(decreaseButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DECREASE_QUANTITY',
      payload: 'product1',
    });
  });

  it('should dispatch SET_QUANTITY when changing input value', () => {
    const context = createMockContext({ product1: 3 });
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    const input = screen.getByDisplayValue('3');
    fireEvent.change(input, { target: { value: '10' } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_QUANTITY',
      payload: { productId: 'product1', quantity: 10 },
    });
  });

  it('should handle multiple products in cart', () => {
    const context = createMockContext({
      product1: 2,
      product2: 5,
    });
    render(
      <CartContext.Provider value={context}>
        <ProductsList products={mockProducts} />
      </CartContext.Provider>
    );

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});
