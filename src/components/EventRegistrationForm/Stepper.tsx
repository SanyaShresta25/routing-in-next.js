import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, completedSteps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = completedSteps.includes(stepNumber);
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200",
                    {
                      "bg-green-500 border-green-500 text-white": isCompleted,
                      "bg-blue-500 border-blue-500 text-white": isCurrent,
                      "bg-gray-100 border-gray-300 text-gray-400": isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>

                {/* Step Content */}
                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors duration-200",
                      {
                        "text-green-600": isCompleted,
                        "text-blue-600": isCurrent,
                        "text-gray-400": isUpcoming,
                      }
                    )}
                  >
                    {step.title}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-1 transition-colors duration-200",
                      {
                        "text-green-500": isCompleted,
                        "text-blue-500": isCurrent,
                        "text-gray-400": isUpcoming,
                      }
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-colors duration-200",
                    {
                      "bg-green-500": stepNumber <= Math.max(...completedSteps),
                      "bg-blue-500": stepNumber === currentStep - 1,
                      "bg-gray-300": stepNumber >= currentStep,
                    }
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;