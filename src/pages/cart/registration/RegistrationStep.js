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
    <>
      <h2>Step 2: Registration</h2>
      <ul>
        {selectedProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <RegistrationForm
        onNext={() => history.push('/cart/payment')}
        onCancel={() => history.push('/cart/')}
        onChange={handleChange}
      />
    </>
  );
};

export default RegistrationStep;
