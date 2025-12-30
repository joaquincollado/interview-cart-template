import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Input, Textarea, Button, FormGroup } from 'mc-components';

const RegistrationForm = ({ onNext, onCancel, onChange }) => {
  const { state } = useCart();
  const [fieldErrors, setFieldErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!state.registration.name || state.registration.name.trim() === '') {
      errors.name = 'Name is required';
    }

    if (
      !state.registration.address ||
      state.registration.address.trim() === ''
    ) {
      errors.address = 'Street address is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onNext();
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
            htmlFor="registration-name"
            className="block mb-1 font-medium text-gray-300"
          >
            Name
          </label>
          <Input
            id="registration-name"
            type="text"
            name="name"
            value={state.registration.name}
            onChange={handleFieldChange}
          />
          {fieldErrors.name && (
            <div className="text-red-500 text-sm mt-1">{fieldErrors.name}</div>
          )}
        </FormGroup>

        <FormGroup>
          <label
            htmlFor="registration-address"
            className="block mb-1 font-medium text-gray-300"
          >
            Street Address
          </label>
          <Textarea
            id="registration-address"
            type="text"
            name="address"
            value={state.registration.address}
            onChange={handleFieldChange}
          />
          {fieldErrors.address && (
            <div className="text-red-500 text-sm mt-1">
              {fieldErrors.address}
            </div>
          )}
        </FormGroup>

        <hr className="my-4" />

        <div className="flex gap-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
