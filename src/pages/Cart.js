import { Switch, Route, useRouteMatch } from 'react-router-dom';

import ProductsStep from './cart/products/ProductsStep';
import RegistrationStep from './cart/registration/RegistrationStep';
import PaymentStep from './cart/payment/PaymentStep';
import ConfirmationStep from './cart/confirmation/ConfirmationStep';
import { CartProvider } from '../context/CartContext';
import GuardedRoute from '../routes/GuardedRoute';
import StepIndicator from '../components/StepIndicator';

const Cart = () => {
  const { path } = useRouteMatch();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
      <CartProvider>
        <StepIndicator />
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
    </div>
  );
};

export default Cart;
