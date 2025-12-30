import { makePurchase } from '../api';
import { useCart } from '../context/CartContext';

const PaymentForm = ({ onNext, onCancel, onChange }) => {
  const { state } = useCart();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      name: state.payment.name,
      card: state.payment.card,
    });
    makePurchase().then(() => {
      onNext();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={state.payment.name}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="name">Credit Card</label>
        <br />
        <input
          type="text"
          name="card"
          value={state.payment.card}
          onChange={onChange}
        />
      </div>

      <hr />

      <button type="button" onClick={onCancel}>
        Back
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

export default PaymentForm;
