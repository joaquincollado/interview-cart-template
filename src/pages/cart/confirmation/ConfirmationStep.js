import { useHistory } from 'react-router-dom';
import OrderConfirmation from '../../../components/OrderConfirmation';

const ConfirmationStep = () => {
  const history = useHistory();

  return (
    <>
      <h2>Step 3: Confirmation</h2>
      <OrderConfirmation />
      <button type="button" onClick={() => history.push('/cart/')}>
        Back to Cart
      </button>
    </>
  );
};

export default ConfirmationStep;
