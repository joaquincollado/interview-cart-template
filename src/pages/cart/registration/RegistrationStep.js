import { useHistory } from 'react-router-dom';
import RegistrationForm from '../../../components/RegistrationForm';

const RegistrationStep = () => {
  const history = useHistory();

  return (
    <RegistrationForm
      onNext={() => history.push('/cart/payment')}
      onCancel={() => history.push('/cart/')}
    />
  );
};

export default RegistrationStep;
