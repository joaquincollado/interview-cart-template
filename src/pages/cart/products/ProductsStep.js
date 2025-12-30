import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../../api';
import ProductsList from '../../../components/ProductsList';
import { useCart } from '../../../context/CartContext';
import { CartActions } from '../../../context/CartActions';

const ProductsStep = () => {
  const history = useHistory();
  const { state, dispatch } = useCart();
  const [status, setStatus] = useState('idle');

  const handleNext = () => {
    history.push('/cart/registration');
  };

  const canProceed = state.selectedProducts.length > 0 && status === 'success';

  useEffect(() => {
    setStatus('loading');
    getProducts()
      .then((data) => {
        dispatch({ type: CartActions.SET_PRODUCTS, payload: data });
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <>
      <h2>Step 1: Products</h2>
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'error' && <p>Error loading products</p>}
      {status === 'success' && (
        <>
          <ProductsList products={state.products} />
          <button type="button" onClick={handleNext} disabled={!canProceed}>
            Next
          </button>
        </>
      )}
    </>
  );
};

export default ProductsStep;
