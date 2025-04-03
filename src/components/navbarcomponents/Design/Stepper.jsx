import { LoaderCircle, Check } from "lucide-react";
import * as React from "react";
import { createContext, useContext } from "react";

// Contexts
const StepperContext = createContext(undefined);
const StepItemContext = createContext(undefined);

const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper");
  }
  return context;
};

const useStepItem = () => {
  const context = useContext(StepItemContext);
  if (!context) {
    throw new Error("useStepItem must be used within a StepperItem");
  }
  return context;
};

// Components
const Stepper = React.forwardRef(
  (
    { defaultValue = 0, value, onValueChange, orientation = "horizontal", className = "", ...props },
    ref,
  ) => {
    const [activeStep, setInternalStep] = React.useState(defaultValue);
    const [loadingStep, setLoadingStep] = React.useState(null);

    const setActiveStep = React.useCallback(
      (step) => {
        if (value === undefined) {
          setInternalStep(step);
        }
        onValueChange?.(step);
      },
      [value, onValueChange],
    );

    const currentStep = value ?? activeStep;

    return (
      <StepperContext.Provider
        value={{
          activeStep: currentStep,
          setActiveStep,
          orientation,
          loadingStep,
          setLoadingStep,
        }}
      >
        <div
          ref={ref}
          className={`group/stepper w-full flex items-center ${className}`}
          data-orientation={orientation}
          {...props}
        >
          <StepperItem step={1}>
            <StepperIndicator />
          </StepperItem>
          <div className="flex-1 h-0.5 bg-gray-500 mx-2" />
          <StepperItem step={2}>
            <StepperIndicator />
          </StepperItem>
          <div className="flex-1 h-0.5 bg-gray-500 mx-2" />
          <StepperItem step={3}>
            <StepperIndicator />
          </StepperItem>
          <div className="flex-1 h-0.5 bg-gray-500 mx-2" />
          <StepperItem step={4}>
            <StepperIndicator />
          </StepperItem>
        </div>
      </StepperContext.Provider>
    );
  },
);
Stepper.displayName = "Stepper";

const StepperItem = React.forwardRef(
  (
    { step, completed = false, disabled = false, loading = false, className = "", children, ...props },
    ref,
  ) => {
    const { activeStep, loadingStep } = useStepper();

    const state =
      completed || step < activeStep ? "completed" : activeStep === step ? "active" : "inactive";

    const isLoading = loadingStep === step;

    return (
      <StepItemContext.Provider value={{ step, state, isDisabled: disabled, isLoading }}>
        <div
          ref={ref}
          className={`group/step flex flex-col items-center ${className}`}
          data-state={state}
          {...(isLoading ? { "data-loading": true } : {})}
          {...props}
        >
          {children}
        </div>
      </StepItemContext.Provider>
    );
  },
);
StepperItem.displayName = "StepperItem";

const StepperIndicator = React.forwardRef(({ className = "", ...props }, ref) => {
  const { step, state, isLoading } = useStepItem();

  return (
    <div
      ref={ref}
      className={`relative flex items-center justify-center rounded-full border-2 border-red-500 text-sm font-medium transition-colors ${
        state === "active" ? "bg-red text-green" : ""
      } ${state === "completed" ? "bg-red text-black" : "bg-red-500 text-red"} ${className}`}
      style={{ width: 32, height: 32 }}
      data-state={state}
      {...props}
    >
      {isLoading ? (
        <LoaderCircle className="absolute animate-spin text-blue-500" size={16} />
      ) : state === "completed" ? (
        <Check size={16} />
      ) : (
        step
      )}
    </div>
  );
});
StepperIndicator.displayName = "StepperIndicator";

export { Stepper, StepperItem, StepperIndicator };

