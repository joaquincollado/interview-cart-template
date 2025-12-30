import { useState } from 'react';
import { makePurchase } from '../api';
import { useCart } from '../context/CartContext';
import { Input, Button, FormGroup } from 'mc-components';

const formatCreditCard = (value) => {
  const digits = value.replace(/\D/g, '');
  const limited = digits.slice(0, 16);
  return limited.match(/.{1,4}/g)?.join(' ') || limited;
};

const validateCreditCard = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  return digits.length >= 13 && digits.length <= 19;
};

const PaymentForm = ({ onNext, onCancel, onChange }) => {
  const { state } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleCardChange = (event) => {
    const formatted = formatCreditCard(event.target.value);
    const syntheticEvent = {
      ...event,
      target: {
        ...event.target,
        name: 'card',
        value: formatted,
      },
    };

    if (fieldErrors.card) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.card;
        return newErrors;
      });
    }

    onChange(syntheticEvent);
  };

  const validateForm = () => {
    const errors = {};

    if (!state.payment.name || state.payment.name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (!state.payment.card || state.payment.card.trim() === '') {
      errors.card = 'Credit card number is required';
    } else if (!validateCreditCard(state.payment.card)) {
      errors.card = 'Please enter a valid credit card number';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);
    makePurchase()
      .then(() => {
        setIsSubmitting(false);
        onNext();
      })
      .catch((err) => {
        setIsSubmitting(false);
        setError('Payment failed. Please try again.');
      });
  };

  const handleFieldChange = (event) => {
    if (fieldErrors[event.target.name]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[event.target.name];
        return newErrors;
      });
    }
    onChange(event);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormGroup>
          <label
            htmlFor="payment-name"
            className="block mb-1 font-medium text-gray-300"
          >
            Name
          </label>
          <Input
            id="payment-name"
            type="text"
            name="name"
            value={state.payment.name}
            onChange={handleFieldChange}
          />
          {fieldErrors.name && (
            <div className="text-red-500 text-sm mt-1">{fieldErrors.name}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label
            htmlFor="payment-card"
            className="block mb-1 font-medium text-gray-300"
          >
            Credit Card
          </label>
          <Input
            id="payment-card"
            type="text"
            name="card"
            value={state.payment.card || ''}
            onChange={handleCardChange}
            placeholder="1234 5678 9012 3456"
          />
          {fieldErrors.card && (
            <div className="text-red-500 text-sm mt-1">{fieldErrors.card}</div>
          )}
        </FormGroup>

        {error && <div className="text-red-500 mt-2 mb-2">{error}</div>}

        <hr className="my-4" />

        <div className="flex gap-2">
          <Button onClick={onCancel} disabled={isSubmitting}>
            Back
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
