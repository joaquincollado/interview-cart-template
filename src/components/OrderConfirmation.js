import { useCart } from '../context/CartContext';
import { getSelectedProducts } from '../context/CartSelectors';
const OrderConfirmation = () => {
  const { state } = useCart();
  return (
    <>
      <h3>Congrats!</h3>
      <p>You've successfully purchased a MasterClass account.</p>
      <p>Name: {state.registration.name}</p>
      <p>Card: {state.payment.card}</p>
      <p>Address: {state.registration.address}</p>
      <p>
        Products:{' '}
        {getSelectedProducts(state)
          .map((product) => product.name)
          .join(', ')}
      </p>
    </>
  );
};

export default OrderConfirmation;
