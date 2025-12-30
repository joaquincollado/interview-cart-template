import { useState, useEffect } from 'react';
import { Button, Loader } from 'mc-components';
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

  const canProceed =
    Object.keys(state.selectedProducts).length > 0 && status === 'success';

  useEffect(() => {
    setStatus('loading');
    getProducts()
      .then((data) => {
        dispatch({ type: CartActions.SET_PRODUCTS, payload: data });
        setStatus('success');
      })
      .catch(() => setStatus('error'));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">Step 1: Products</h2>
      {status === 'loading' && (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      )}
      {status === 'error' && (
        <p className="text-red-600">Error loading products</p>
      )}
      {status === 'success' && (
        <>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
            <ProductsList products={state.products} />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={!canProceed}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsStep;
