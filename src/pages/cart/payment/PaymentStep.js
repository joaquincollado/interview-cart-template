import { useHistory } from 'react-router-dom';
import PaymentForm from '../../../components/PaymentForm';
import { useCart } from '../../../context/CartContext';
import { useEffect } from 'react';
import { CartActions } from '../../../context/CartActions';
const PaymentStep = () => {
  const history = useHistory();
  const { state, dispatch } = useCart();

  useEffect(() => {
    if (!state.payment.name && state.registration.name) {
      dispatch({
        type: CartActions.SET_PAYMENT,
        payload: {
          field: 'name',
          value: state.registration.name,
        },
      });
    }
  }, [state.registration.name, state.payment.name, dispatch]);

  const handleChange = (event) => {
    dispatch({
      type: CartActions.SET_PAYMENT,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Step 3: Payment</h2>
      <PaymentForm
        onNext={() => history.push('/cart/confirmation')}
        onCancel={() => history.push('/cart/registration')}
        onChange={handleChange}
      />
    </div>
  );
};

export default PaymentStep;
