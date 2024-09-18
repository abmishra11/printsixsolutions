"use client";
import React from "react";
import PersonalDetailsForm from "./StepForms/PersonalDetailsForm";
import ShippingDetailsForm from "./StepForms/ShippingDetailsForm";
import PaymentMethodForm from "./StepForms/PaymentMethodForm";
import OrderSummary from "./StepForms/OrderSummary";
import { useSelector } from "react-redux";
import BillingDetailsForm from "./StepForms/BillingDetailsForm";

export default function StepForm({ addresses, userData }) {
  const currentStep = useSelector((store) => store.checkout.currentStep);
  function renderFormByStep(step) {
    if (step === 1) {
      return <PersonalDetailsForm userData={userData} />;
    } else if (step === 2) {
      return <ShippingDetailsForm addresses={addresses} />;
    } else if (step === 3) {
      return <BillingDetailsForm addresses={addresses} />;
    } else if (step === 4) {
      return <PaymentMethodForm />;
    } else if (step === 5) {
      return <OrderSummary />;
    }
  }
  return <div>{renderFormByStep(currentStep)}</div>;
}
