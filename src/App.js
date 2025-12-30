import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Layout from './Layout';
import Cart from './pages/Cart';

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Redirect to="/cart" />
          </Route>
          <Route>
            <Redirect to="/cart" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
