import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProductsStep from './cart/products/ProductsStep';
import RegistrationStep from './cart/registration/RegistrationStep';
import PaymentStep from './cart/payment/PaymentStep';
import ConfirmationStep from './cart/confirmation/ConfirmationStep';
import { CartProvider } from '../context/CartContext';
import GuardedRoute from '../routes/GuardedRoute';

const Cart = () => {
  const { path } = useRouteMatch();

  return (
    <>
      <h1>Checkout</h1>
      <CartProvider>
        <Switch>
          <Route exact path={path}>
            <ProductsStep />
          </Route>

          <GuardedRoute
            exact
            require="products"
            redirectTo={path}
            path={`${path}/registration`}
          >
            <RegistrationStep />
          </GuardedRoute>

          <GuardedRoute
            exact
            require="registration"
            redirectTo={`${path}/registration`}
            path={`${path}/payment`}
          >
            <PaymentStep />
          </GuardedRoute>

          <GuardedRoute
            exact
            require="payment"
            redirectTo={`${path}/payment`}
            path={`${path}/confirmation`}
          >
            <ConfirmationStep />
          </GuardedRoute>
        </Switch>
      </CartProvider>
    </>
  );
};

export default Cart;
