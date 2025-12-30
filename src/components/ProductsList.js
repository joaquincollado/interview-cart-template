import { useCart } from '../context/CartContext';
import { CartActions } from '../context/CartActions';

const ProductsList = ({ products }) => {
  const { state, dispatch } = useCart();
  return (
    <ul>
      {products.map((product) => {
        const checked = state.selectedProducts.includes(product.id);
        return (
          <li key={product.id}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() =>
                dispatch({
                  type: CartActions.TOGGLE_PRODUCT,
                  payload: product.id,
                })
              }
            />
            <label htmlFor={product.id}>{product.name}</label>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsList;
