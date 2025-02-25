import React, { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

const ParentComponent = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    tulajdonosNeve: "",
    tulajdonosCim: "",
    tulajdonosTel: "",
    tulajdonosEmail: "",
    ebHivonev: "",
    ebTorzskonyvNeve: "",
    ebFajta: "",
    ebNeme: "Szuka",
    ebSzulIdo: "",
    ebSzin: "",
    mikrochip: false,
    mikrochipSorszam: "",
    ivartalanitas: false,
    ivartalanitasIdo: "",
    utolsoOltasIdo: "",
    orvosiBelyegzoSzam: "",
    oltanyagSorszam: "",
    oltasiKonyvSzam: "",
    allatorvosBelyegzoSzam: "",
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <div>
      {step === 1 && (
        <Step1
          formData={formData}
          handleNext={handleNext}
          handleChange={handleChange}
        />
      )}
      {step === 2 && (
        <Step2
          formData={formData}
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
      {step === 3 && (
        <Step3
          formData={formData}
          handleNext={handleNext}
          handleBack={handleBack}
          handleChange={handleChange}
        />
      )}
    </div>
  );
};

export default ParentComponent;