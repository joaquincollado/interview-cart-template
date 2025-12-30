import { useCart } from '../context/CartContext';
import { CartActions } from '../context/CartActions';

const ProductsList = ({ products }) => {
  const { state, dispatch } = useCart();

  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value) || 0;
    dispatch({
      type: CartActions.SET_QUANTITY,
      payload: { productId, quantity },
    });
  };

  const increaseQuantity = (productId) => {
    dispatch({
      type: CartActions.INCREASE_QUANTITY,
      payload: productId,
    });
  };

  const decreaseQuantity = (productId) => {
    dispatch({
      type: CartActions.DECREASE_QUANTITY,
      payload: productId,
    });
  };

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const quantity = state.selectedProducts[product.id] || 0;
        const inCart = quantity > 0;

        return (
          <div
            key={product.id}
            className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
              inCart
                ? 'border-blue-500 bg-gray-750'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
          >
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{product.name}</h3>
            </div>

            <div className="flex items-center space-x-3">
              {inCart ? (
                <>
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold text-xl transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    className="w-16 h-10 text-center bg-gray-700 border-2 border-gray-600 rounded-lg text-white font-semibold focus:outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => increaseQuantity(product.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </>
              ) : (
                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
