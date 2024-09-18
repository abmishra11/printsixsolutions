"use client";
import React from "react";
import { useSelector } from "react-redux";
import BasicInformationForm from "./StepForms/BasicInformationForm";
import BusinessDetailsForm from "./StepForms/BusinessDetailsForm";
import AdditionalInformationForm from "./StepForms/AdditionalInformationForm";
import Summary from "./StepForms/Summary";

export default function StepForm({ vendorId }) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  console.log(currentStep);
  function renderFormByStep(step) {
    if (step === 1) {
      return <BasicInformationForm />;
    } else if (step === 2) {
      return <BusinessDetailsForm />;
    } else if (step === 3) {
      return <AdditionalInformationForm />;
    } else if (step === 4) {
      return <Summary vendorId={vendorId} />;
    }
  }
  return <div>{renderFormByStep(currentStep)}</div>;
}
