import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../../api';
import ProductsList from '../../../components/ProductsList';

const ProductsStep = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <>
      <h2>Step 1: Products</h2>
      <ProductsList products={products} />
      <button onClick={() => history.push('/cart/registration')}>Next</button>
    </>
  );
};

export default ProductsStep;
