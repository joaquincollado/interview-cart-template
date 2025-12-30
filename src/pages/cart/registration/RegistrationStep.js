import { useHistory } from 'react-router-dom';
import RegistrationForm from '../../../components/RegistrationForm';
import { useCart } from '../../../context/CartContext';
import { getSelectedProducts } from '../../../context/CartSelectors';
import { CartActions } from '../../../context/CartActions';

const RegistrationStep = () => {
  const history = useHistory();
  const { state, dispatch } = useCart();

  const selectedProducts = getSelectedProducts(state);

  const handleChange = (event) => {
    dispatch({
      type: CartActions.SET_REGISTRATION,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">
        Step 2: Registration
      </h2>
      {selectedProducts.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-200 mb-2">Cart Summary:</h3>
          <ul className="space-y-2 text-gray-300">
            {selectedProducts.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center"
              >
                <span>{product.name}</span>
                <span className="font-semibold text-blue-400">
                  Qty: {product.quantity}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <RegistrationForm
        onNext={() => history.push('/cart/payment')}
        onCancel={() => history.push('/cart/')}
        onChange={handleChange}
      />
    </div>
  );
};

export default RegistrationStep;
