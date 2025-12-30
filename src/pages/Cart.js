import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import ProductsStep from './cart/products/ProductsStep';
import RegistrationStep from './cart/registration/RegistrationStep';
import PaymentStep from './cart/payment/PaymentStep';
import ConfirmationStep from './cart/confirmation/ConfirmationStep';
import { CartProvider } from '../context/CartContext';

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

          <Route exact path={`${path}/registration`}>
            <RegistrationStep />
          </Route>

          <Route exact path={`${path}/payment`}>
            <PaymentStep />
          </Route>

          <Route exact path={`${path}/confirmation`}>
            <ConfirmationStep />
          </Route>

          <Route>
            <Redirect to={`${path}`} />
          </Route>
        </Switch>
      </CartProvider>
    </>
  );
};

export default Cart;
