import { Route, Redirect } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const isNotEmpty = (value) => value !== '';

const hasSelectedProducts = (state) => state.selectedProducts.length > 0;

const hasRegistration = (state) =>
  isNotEmpty(state.registration.name) && isNotEmpty(state.registration.address);

const hasPayment = (state) =>
  isNotEmpty(state.payment.name) && isNotEmpty(state.payment.card);

const GuardedRoute = ({ children, require, redirectTo, ...props }) => {
  const { state } = useCart();
  const allowed =
    require === 'products'
      ? hasSelectedProducts(state)
      : require === 'registration'
        ? hasSelectedProducts(state) && hasRegistration(state)
        : require === 'payment'
          ? hasSelectedProducts(state) &&
            hasRegistration(state) &&
            hasPayment(state)
          : true;
  const fallback =
    redirectTo ||
    (require === 'products'
      ? '/cart/products'
      : require === 'registration'
        ? '/cart/registration'
        : require === 'payment'
          ? '/cart/payment'
          : '/cart');

  console.log('🟡 GUARD', require, {
    allowed,
    fallback,
    selectedProducts: state.selectedProducts,
    registration: state.registration,
    payment: state.payment,
  });
  return (
    <Route
      {...props}
      render={() => (allowed ? children : <Redirect to={fallback} />)}
    />
  );
};

export default GuardedRoute;
