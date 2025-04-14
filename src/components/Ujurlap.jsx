import React, { useState, createContext, useContext } from "react";
import Step1 from "./navbarcomponents/steps/Step1";
import Step2 from "./navbarcomponents/steps/Step2";
import Step3 from "./navbarcomponents/steps/Step3";
import Step4 from "./navbarcomponents/steps/Step4";
import HoverButton from "./navbarcomponents/Design/HoverButton";
import { TextShimmer } from "./navbarcomponents/Design/TextShimmer";
import { ShineBorder } from "./navbarcomponents/Design/ShineBorder";
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
  const [formData, setFormData] = useState({
    // Kezdeti űrlap adatok
    step1: {},
    step2: {},
    step3: {},
    step4: {}
  });

  const handleStart = () => {
    setShowSteps(true);
    setStep(1);
  };

  const handleNext = (stepData) => {
    setFormData(prev => ({
      ...prev,
      [`step${step}`]: stepData
    }));

    if (step < 4) {
      setLoadingStep(step);
      setTimeout(() => {
        setLoadingStep(null);
        setStep(step + 1);
      }, 800);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (finalData) => {
    // Összeállítjuk a végső adatokat
    const completeData = {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3,
      ...finalData
    };
    
    // console.log("Űrlap adatok:", completeData);
    // Itt lehetne API hívás vagy más adatfeldolgozás
    alert("Űrlap sikeresen elküldve!");
    setShowSteps(false);
    setStep(1);
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      {!showSteps ? (
        <div className="flex flex-col items-center gap-6 mt-12">
          <TextShimmer className="text-2xl font-newsreader text-center">
            Új űrlap kitöltéséhez kattintson a gombra
          </TextShimmer>
          <HoverButton 
            text="Új űrlap kitöltése" 
            onClick={handleStart} 
            className="w-56 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all hover:shadow-xl"
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Új Űrlap kitöltése</h1>
          </div>
          
          <Stepper value={step} loadingStep={loadingStep} onValueChange={setStep} />
          
          <ShineBorder 
            borderRadius={12} 
            borderWidth={2} 
            color={["#3b82f6", "#8b5cf6"]} 
            className="w-full mt-8"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-sm">
              {step === 1 && <Step1 handleNext={handleNext} initialData={formData.step1} />}
              {step === 2 && (
                <Step2 
                  handleNext={handleNext} 
                  handleBack={handleBack} 
                  initialData={formData.step2} 
                />
              )}
              {step === 3 && (
                <Step3 
                  handleNext={handleNext} 
                  handleBack={handleBack} 
                  initialData={formData.step3} 
                />
              )}
              {step === 4 && (
                <Step4 
                  handleBack={handleBack} 
                  handleSubmit={handleSubmit} 
                  initialData={formData.step4}
                />
              )}
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
      <div className="flex items-center w-full px-4">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={step}>
            <StepperItem 
              step={step} 
              completed={step < value} 
              loading={loadingStep === step} 
              onClick={() => onValueChange(step)}
            />
            {index < 3 && (
              <div className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                step < value ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </StepperContext.Provider>
  );
};

const StepperItem = ({ step, completed, loading, onClick }) => {
  const { activeStep } = useStepper();
  const state = completed ? "completed" : activeStep === step ? "active" : "inactive";
  
  return (
    <StepItemContext.Provider value={{ step, state, loading }}>
      <button 
        onClick={onClick}
        disabled={loading || state === 'active'}
        className="focus:outline-none"
      >
        <StepperIndicator />
      </button>
    </StepItemContext.Provider>
  );
};

const StepperIndicator = () => {
  const { step, state, loading } = useStepItem();
  
  return (
    <div
      className={`relative flex items-center justify-center rounded-full border-2 text-sm font-medium transition-all duration-300
        ${state === "active" ? "border-blue-500 bg-blue-500 text-white shadow-md" : ""}
        ${state === "completed" ? "border-green-500 bg-green-500 text-white" : ""}
        ${state === "inactive" ? "border-gray-300 dark:border-gray-600 bg-transparent text-gray-500 dark:text-gray-400" : ""}
        hover:scale-105 active:scale-95`}
      style={{ width: 36, height: 36 }}
    >
      {loading ? (
        <LoaderCircle className="absolute animate-spin text-white" size={18} />
      ) : state === "completed" ? (
        <Check size={18} className="text-white" />
      ) : (
        <span className="font-medium">{step}</span>
      )}
    </div>
  );
};

export default Ujurlap;