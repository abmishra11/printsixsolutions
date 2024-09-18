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

export default function BasicInformationForm() {
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

  const dispatch = useDispatch();
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
        Basic Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label={"First Name"}
          name={"firstName"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Last Name"}
          name={"lastName"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Phone Number"}
          name={"phone"}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Physical Address"}
          name={"physicalAddress"}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Contact Person"}
          name={"contactPerson"}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Contact Person Phone"}
          name={"contactPersonPhone"}
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
      </div>
      <NavButtons />
    </form>
  );
}
