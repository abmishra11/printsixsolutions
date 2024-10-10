"use client";
import TextInput from "@/components/forminputs/TextInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, CreditCard, HeartHandshake, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";

export default function PaymentMethodForm() {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
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

  const initialPaymentMethod = existingFormData.paymentMethod || "";
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);

  async function processData(data) {
    data.paymentMethod = paymentMethod;
    console.log(data);
    // Update the checkout data
    dispatch(updateCheckoutFormData(data));
    // Update the current step
    dispatch(setCurrentStep(currentStep + 1));
  }

  async function submitData() {
    console.log(checkoutFormData);
  }

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-primary">
        Payment Method
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Payment Method */}
        <div className="col-span-full">
          <h3 className="mb-5 font-medium text-gray-900 dark:text-white">
            Which payment method do you prefer ?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="Cash On Delivery"
                className="hidden peer"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                htmlFor="cod"
                className="inline-flex items-center justify-between w-full p-5 text-white bg-white border border-gray-200 rounded-lg cursor-pointer dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary dark:text-white dark:bg-gray-800"
              >
                {/* Design the Label */}
                <div className="flex gap-2 items-center">
                  <HeartHandshake className="w-8 h-8 ms-3 flex-shrink-0" />
                  <p>Cash On Delivery</p>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="creditCard"
                name="paymentMethod"
                value="Credit Card"
                className="hidden peer"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label
                htmlFor="creditCard"
                className="inline-flex items-center justify-between w-full p-5 text-white bg-white border border-gray-200 rounded-lg cursor-pointer dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary dark:text-white dark:bg-gray-800"
              >
                {/* Design the Label */}
                <div className="flex gap-2 items-center">
                  <CreditCard className="w-8 h-8 ms-3 flex-shrink-0" />
                  <p>Credit Card</p>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
          </ul>
        </div>
      </div>
      <NavButtons />
    </form>
  );
}
