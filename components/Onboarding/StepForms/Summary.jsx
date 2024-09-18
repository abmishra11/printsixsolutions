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
import { useRouter } from "next/navigation";
import { generateUserCode } from "@/lib/generateUserCode";
import { makePostRequest } from "@/lib/apiRequest";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Summary({ vendorId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const existingFormData = useSelector(
    (store) => store.onboarding.onboardingFormData
  );
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }

  async function submitData() {
    const data = {
      ...existingFormData,
    };
    const fullName = `${data.firstName} ${data.lastName}`;
    const code = generateUserCode("printsix", fullName);
    data.code = code;
    data.userId = vendorId;
    console.log(data);
  }
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">Summary</h2>
      <div className="flex">
        <h2>Here is your details</h2>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          type="button"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
        {loading ? (
          <button
            disabled
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            Processing please wait...
          </button>
        ) : (
          <button
            onClick={submitData}
            className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-slate-900 rounded-lg focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900 hover:bg-slate-800 dark:bg-lime-600 dark:hover:bg-lime-700"
          >
            <span>Submit Data</span>
            <ChevronRight className="w-5 h-5 mr-2" />
          </button>
        )}
      </div>
    </div>
  );
}
