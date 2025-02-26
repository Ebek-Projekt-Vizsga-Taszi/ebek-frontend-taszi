import React, { useState, createContext, useContext } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import HoverButton from "./Design/HoverButton"; // Javított import
import { TextShimmer } from "./Design/TextShimmer"; // Javított import
import { ShineBorder } from "./Design/ShineBorder"; // Javított import
import { LoaderCircle, Check } from "lucide-react";

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

const Ujurlap = () => {
  const [step, setStep] = useState(1);
  const [showSteps, setShowSteps] = useState(false);
  const [loadingStep, setLoadingStep] = useState(null);

  const handleStart = () => {
    setShowSteps(true);
    setStep(1);
  };

  const handleNext = () => {
    if (step < 4) {
      setLoadingStep(step);
      setTimeout(() => {
        setLoadingStep(null);
        setStep(step + 1);
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 text-white">
      {!showSteps ? (
        <div className="flex flex-col items-center gap-4">
          <TextShimmer className="text-lg font-newsreader">
            Új űrlap kitöltéséhez kattintson a gombra
          </TextShimmer>
          <HoverButton text="Új űrlap kitöltése" onClick={handleStart} className="w-44 bg-white text-white" />
        </div>
      ) : (
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-newsreader">Új Űrlap</div>
          </div>
          <Stepper value={step} loadingStep={loadingStep} onValueChange={setStep} />
          <ShineBorder borderRadius={12} borderWidth={2} color={["#ff8a00", "#e52e71"]} className="w-full mt-8">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg">
              {step === 1 && <Step1 handleNext={handleNext} />}
              {step === 2 && <Step2 handleNext={handleNext} handleBack={handleBack} />}
              {step === 3 && <Step3 handleNext={handleNext} handleBack={handleBack} />}
              {step === 4 && <Step4 handleBack={handleBack} />}
            </div>
          </ShineBorder>
        </div>
      )}
    </div>
  );
};

const Stepper = ({ value, loadingStep, onValueChange }) => {
  return (
    <StepperContext.Provider value={{ activeStep: value, loadingStep }}>
      <div className="flex items-center w-full">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={step}>
            <StepperItem step={step} completed={step < value} loading={loadingStep === step} />
            {index < 3 && <div className="flex-1 h-0.5 bg-gray-500 mx-2" />}
          </React.Fragment>
        ))}
      </div>
    </StepperContext.Provider>
  );
};

const StepperItem = ({ step, completed, loading }) => {
  const { activeStep } = useStepper();
  const state = completed ? "completed" : activeStep === step ? "active" : "inactive";
  return (
    <StepItemContext.Provider value={{ step, state, loading }}>
      <StepperIndicator />
    </StepItemContext.Provider>
  );
};

const StepperIndicator = () => {
  const { step, state, loading } = useStepItem();
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2 border-gray-500 text-sm font-medium transition-colors
        ${state === "active" ? "bg-white text-black" : ""}
        ${state === "completed" ? "bg-white text-white" : "bg-gray-500 text-black"}`}
      style={{ width: 32, height: 32 }}
    >
      {loading ? (
        <LoaderCircle className="absolute animate-spin text-blue-500" size={16} />
      ) : state === "completed" ? (
        <Check size={16} className="text-black" />
      ) : (
        step
      )}
    </div>
  );
};

export default Ujurlap;