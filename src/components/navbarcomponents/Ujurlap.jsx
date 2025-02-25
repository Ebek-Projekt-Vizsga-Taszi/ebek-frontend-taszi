import React, { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import HoverButton from "./HoverButton";
import { TextShimmer } from "./TextShimmer";
import { ShineBorder } from "./ShineBorder";

const Ujurlap = () => {
  const [step, setStep] = useState(1);
  const [showSteps, setShowSteps] = useState(false);

  const handleStart = () => {
    setShowSteps(true);
    setStep(1);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
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
          <HoverButton
            text="Új űrlap kitöltése"
            onClick={handleStart}
            className="w-44 bg-white text-white"
          />
        </div>
      ) : (
        <div className="w-full max-w-4xl mb-4">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg text-w font-newsreader">Új Űrlap</div>
          </div>
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 h-1 bg-gray-200">
              <div className="h-1 bg-blue-500" style={{ width: `${(step - 1) * 33}%` }}></div>
            </div>
            <div className="relative z-10 flex justify-between items-center">
              {[1, 2, 3, 4].map((number) => (
                <div key={number} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer select-none ${
                      step >= number ? "bg-blue-500 text-black" : "bg-gray-200 text-black"
                    }`}
                    style={{ marginLeft: "-12px" }}
                  >
                    {number}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* ShineBorder csak a tartalmi doboz köré */}
          <ShineBorder borderRadius={12} borderWidth={2} color={["#ff8a00", "#e52e71"]} className="w-full">
            <div className=" bg-gray-900/50 backdrop-blur-sm p-6">
              <div>
                {step === 1 && <Step1 handleNext={handleNext} />}
                {step === 2 && <Step2 handleNext={handleNext} handleBack={handleBack} />}
                {step === 3 && <Step3 handleNext={handleNext} handleBack={handleBack} />}
                {step === 4 && <Step4 handleBack={handleBack} />}
              </div>
            </div>
          </ShineBorder>
        </div>
      )}
    </div>
  );
};

export default Ujurlap;