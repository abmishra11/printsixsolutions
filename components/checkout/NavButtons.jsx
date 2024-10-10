import React from "react";
import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "@/redux/slices/checkoutSlice";

export default function NavButtons() {
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const dispatch = useDispatch();
  function handlePrevious() {
    dispatch(setCurrentStep(currentStep - 1));
  }
  return (
    <div className="flex justify-between items-center">
      {currentStep > 1 && (
        <button
          onClick={handlePrevious}
          type="submit"
          className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>Previous</span>
        </button>
      )}
      <button
        type="submit"
        className="inline-flex items-center px-6 py-3 mt-4 sm:mt-6 font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-primary dark:focus:ring-primary hover:bg-slate-800 dark:bg-primary dark:hover:bg-white dark:hover:text-slate-800"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5 mr-2" />
      </button>
    </div>
  );
}
