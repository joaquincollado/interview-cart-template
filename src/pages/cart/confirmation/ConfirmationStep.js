import { useHistory } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { CartActions } from '../../../context/CartActions';
import OrderConfirmation from '../../../components/OrderConfirmation';
import { Button } from 'mc-components';
const ConfirmationStep = () => {
  const history = useHistory();
  const { dispatch } = useCart();
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">
        Step 4: Confirmation
      </h2>
      <OrderConfirmation />
      <div className="flex justify-center">
        <Button
          onClick={() => {
            dispatch({ type: CartActions.RESET_CART });
            history.push('/cart/');
          }}
        >
          Back to Cart
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
