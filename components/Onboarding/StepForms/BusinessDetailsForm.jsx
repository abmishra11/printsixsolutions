"use client";
import TextInput from "@/components/forminputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import NavButtons from "../NavButtons";
import ArrayItemsInput from "@/components/forminputs/ArrayItemsInput";

export default function BusinessDetailsForm() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...existingFormData,
    },
  });

  async function processData(data) {
    // Update the checkout data
    dispatch(updateOnboardingFormData(data));
    // Update the current step
    dispatch(setCurrentStep(currentStep + 1));
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Vendor Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label={"What is size of your land in accres"}
          name={"landSize"}
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"What is your main crop that you cultivate"}
          name={"mainCrop"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle={"Product"}
        />
      </div>
      <NavButtons />
    </form>
  );
}
