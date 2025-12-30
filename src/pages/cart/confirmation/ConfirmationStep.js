import { useHistory } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { CartActions } from '../../../context/CartActions';
import OrderConfirmation from '../../../components/OrderConfirmation';

const ConfirmationStep = () => {
  const history = useHistory();
  const { dispatch } = useCart();
  return (
    <>
      <h2>Step 3: Confirmation</h2>
      <OrderConfirmation />
      <button
        type="button"
        onClick={() => {
          dispatch({ type: CartActions.RESET_CART });
          history.push('/cart/');
        }}
      >
        Back to Cart
      </button>
    </>
  );
};

export default ConfirmationStep;
