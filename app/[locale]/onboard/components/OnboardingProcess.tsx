"use client";
import { useState } from "react";
import { OnboardNav } from "./OnboardNav";
import { Step1 } from "./Step1";
import { Step2 } from "./Step2";
import { Step3 } from "./Step3";
import { Step4 } from "./Step4";
import { Step5 } from "./Step5";
import { UserData } from "../types";

export const OnboardingProcess = () => {
  // State to track the current step of the registration flow
  const [step, setStep] = useState(1);
  // State to store form data across steps
  const [formData, setFormData] = useState<UserData>({
    name: "",
    email: "",
    titleEn: "",
    titleFr: "",
    department: "",
    address: {
      street: "",
      province: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
    },
    supervisor: "",
    team: "",
  });
  // Function to move to the next step
  const handleNextStep = () => {
    setStep(step + 1);
  }; // Function to move to the previous step
  const handlePreviousStep = () => {
    setStep(step - 1);
  }; // Function to handle form data changes across steps
  const handleFormDataChange = (updated: UserData) => {
    setFormData({ ...formData, ...updated });
  };

  const stepComponents = [
    <Step1 nextStep={handleNextStep} />,
    <Step2 initialData={formData} update={handleFormDataChange} nextStep={handleNextStep} />,
    <Step3
      initialData={formData}
      update={handleFormDataChange}
      nextStep={handleNextStep}
      backStep={handlePreviousStep}
    />,
    <Step4
      initialData={formData}
      update={handleFormDataChange}
      nextStep={handleNextStep}
      backStep={handlePreviousStep}
    />,
    <Step5 />,
  ];

  return (
    <>
      <OnboardNav totalSteps={5} currentStep={step} />
      <div>{stepComponents[step - 1]}</div>
    </>
  );
};
