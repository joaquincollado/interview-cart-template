import { useHistory } from 'react-router-dom';
import PaymentForm from '../../../components/PaymentForm';

const PaymentStep = () => {
  const history = useHistory();

  return (
    <>
      <h2>Step 2: Payment</h2>
      <PaymentForm
        onNext={() => history.push('/cart/confirmation')}
        onCancel={() => history.push('/cart/registration')}
      />
    </>
  );
};

export default PaymentStep;
