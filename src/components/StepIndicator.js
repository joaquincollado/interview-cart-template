import { useLocation } from 'react-router-dom';
import { IconCheckCircle } from 'mc-components';

const steps = [
  { path: '/cart', number: 1, label: 'Products' },
  { path: '/cart/registration', number: 2, label: 'Registration' },
  { path: '/cart/payment', number: 3, label: 'Payment' },
  { path: '/cart/confirmation', number: 4, label: 'Confirmation' },
];

const StepIndicator = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getCurrentStepIndex = () => {
    if (currentPath === '/cart/confirmation') return 3;
    if (currentPath === '/cart/payment') return 2;
    if (currentPath === '/cart/registration') return 1;
    return 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  const progressPercentage =
    steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="mb-10 mt-6 w-full">
      <div className="flex justify-between items-start max-w-[900px] mx-auto relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.path}
              className="flex-1 flex flex-col items-center relative"
              style={{ zIndex: 10 }}
            >
              {index < steps.length - 1 && (
                <>
                  <div
                    className="absolute h-2 bg-gray-700 rounded-full"
                    style={{
                      top: '30%',
                      left: '50%',
                      right: '-50%',
                      zIndex: 0,
                    }}
                  />
                  {isCompleted && (
                    <div
                      className="absolute h-2 bg-green-600 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        top: '30%',
                        left: '50%',
                        right: '-50%',
                        zIndex: 1,
                      }}
                    />
                  )}
                  {isCurrent &&
                    progressPercentage > (index / (steps.length - 1)) * 100 && (
                      <div
                        className="absolute h-2 bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
                        style={{
                          top: '30%',
                          left: '50%',
                          width: '50%',
                          zIndex: 1,
                        }}
                      />
                    )}
                </>
              )}

              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center font-bold text-3xl mb-3 transition-all duration-300 ease-in-out z-10 ${
                  isCompleted
                    ? 'bg-green-600 text-white border-4 border-green-600 shadow-lg'
                    : isCurrent
                      ? 'bg-blue-600 text-white border-4 border-blue-600 shadow-xl'
                      : 'bg-gray-700 text-gray-400 border-4 border-gray-600'
                }`}
              >
                {isCompleted ? (
                  <IconCheckCircle className="w-12 h-12" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-lg text-center font-medium ${
                  isCompleted
                    ? 'text-green-400'
                    : isCurrent
                      ? 'text-blue-400 font-bold'
                      : 'text-gray-500'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
