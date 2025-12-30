import { useCart } from '../context/CartContext';

const RegistrationForm = ({ onNext, onCancel, onChange }) => {
  const { state } = useCart();
  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          name="name"
          value={state.registration.name}
          onChange={onChange}
        />
      </div>

      <div>
        <label htmlFor="name">Street Address</label>
        <br />
        <textarea
          type="text"
          name="address"
          value={state.registration.address}
          onChange={onChange}
        />
      </div>

      <hr />

      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit">Next</button>
    </form>
  );
};

export default RegistrationForm;
