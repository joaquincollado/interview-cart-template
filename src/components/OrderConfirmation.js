import { useCart } from '../context/CartContext';
import { getSelectedProducts } from '../context/CartSelectors';

const maskCreditCard = (cardNumber) => {
  if (!cardNumber) return '';
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 4) return cardNumber;
  const lastFour = digits.slice(-4);
  return `**** **** **** ${lastFour}`;
};

const OrderConfirmation = () => {
  const { state } = useCart();
  const selectedProducts = getSelectedProducts(state);

  return (
    <div className="bg-gradient-to-br from-green-900 to-emerald-900 border-2 border-green-700 rounded-xl p-6 space-y-4 shadow-2xl">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-green-400 mb-2">🎉 Congrats!</h3>
        <p className="text-gray-200 font-medium">
          You've successfully purchased MasterClass products.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-5 space-y-3 border border-gray-700 shadow-md">
        <div>
          <span className="font-semibold text-gray-400">Name:</span>{' '}
          <span className="text-gray-100">{state.registration.name}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Card:</span>{' '}
          <span className="text-gray-100 font-mono">
            {maskCreditCard(state.payment.card)}
          </span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Address:</span>{' '}
          <span className="text-gray-100">{state.registration.address}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-400">Products:</span>
          <ul className="mt-2 space-y-1">
            {selectedProducts.length > 0
              ? selectedProducts.map((product) => (
                  <li
                    key={product.id}
                    className="text-gray-100 flex justify-between"
                  >
                    <span>{product.name}</span>
                    <span className="text-blue-400 font-medium">
                      × {product.quantity}
                    </span>
                  </li>
                ))
              : Object.entries(state.selectedProducts).map(([id, quantity]) => (
                  <li key={id} className="text-gray-100 flex justify-between">
                    <span>
                      {state.products.find((p) => p.id === id)?.name ||
                        `Product ${id}`}
                    </span>
                    <span className="text-blue-400 font-medium">
                      × {quantity}
                    </span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
