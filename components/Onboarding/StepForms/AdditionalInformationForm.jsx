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
import ImageInput from "@/components/forminputs/ImageInput";
import TextareaInput from "@/components/forminputs/TextAreaInput";

export default function AdditionalInformationForm() {
  const [imageUrl, setImageUrl] = useState([]);
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
        Additional Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          imageFile={imageUrl}
          setImageFile={setImageUrl}
          label={"Vendor Profile Image"}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextareaInput
          label={"Vendor's Payment Terms"}
          name={"terms"}
          register={register}
          errors={errors}
          isRequired={false}
        />
        <TextareaInput
          label={"Notes"}
          name={"notes"}
          register={register}
          errors={errors}
          isRequired={false}
        />
      </div>
      <NavButtons />
    </form>
  );
}
