import React, { useState } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

const Ujurlap = () => {
  const [step, setStep] = useState(1);

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
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl mb-4">
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg text-black font-newsreader">Új Űrlap</div>
          <button className="bg-blue-500 text-white py-1 px-3 rounded">Űrlap Megnyitása</button>
        </div>
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-0 w-full transform -translate-y-1/2 h-1 bg-gray-200">
            <div
              className="h-1 bg-blue-500"
              style={{ width: `${(step - 1) * 34.33}%` }}
            ></div>
          </div>
          <div className="relative z-10 flex justify-between items-center">
            {[1, 2, 3, 4].map((number) => (
              <div key={number} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= number ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                  }`}
                  style={{ marginLeft: '-12px' }}
                >
                  {number}
                </div>
                {number < 4 && (
                  <div className="h-1 w-16"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          {step === 1 && <Step1 handleNext={handleNext} />}
          {step === 2 && <Step2 handleNext={handleNext} handleBack={handleBack} />}
          {step === 3 && <Step3 handleNext={handleNext} handleBack={handleBack} />}
          {step === 4 && <Step4 handleBack={handleBack} />}
        </div>
      </div>
    </div>
  );
};

export default Ujurlap;
