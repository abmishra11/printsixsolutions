"use client";
import TextInput from "@/components/forminputs/TextInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";
import SelectInput from "@/components/forminputs/SelectInput";
import { getData } from "@/lib/getData";

export default async function BillingDetailsForm({ addresses }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  const newAddedAddresses = existingFormData?.newAddedAddresses;

  const currentAddresses =
    newAddedAddresses.length === 0 ? addresses : newAddedAddresses;
  let defaultBillingAddress = {};
  if (currentAddresses.length > 0) {
    const billingAddress = currentAddresses.filter(
      (address) => address.defaultBilling === true
    );
    defaultBillingAddress = billingAddress[0];
  }

  const states = [
    { id: "Alberta", title: "Alberta" },
    { id: "British Columbia", title: "British Columbia" },
    { id: "Manitoba", title: "Manitoba" },
    { id: "Newfoundland and Labrador", title: "Newfoundland and Labrador" },
    { id: "Northwest Territories", title: "Northwest Territories" },
    { id: "Nova Scotia", title: "Nova Scotia" },
    { id: "Nunavut", title: "Nunavut" },
    { id: "Ontario", title: "Ontario" },
    { id: "Prince Edward Island", title: "Prince Edward Island" },
    { id: "Quebec", title: "Quebec" },
    { id: "Saskatchewan", title: "Saskatchewan" },
    { id: "Yukon Territory", title: "Yukon Territory" },
  ];

  const countries = [
    { id: "Canada", title: "Canada" },
    { id: "United States", title: "United States" },
  ];

  let selectedBillingAddress = {};
  if (existingFormData.billingAddress) {
    selectedBillingAddress = {
      billingAddressId: existingFormData.billingAddress.billingAddressId,
      streetAddress1: existingFormData.billingAddress.streetAddress1,
      streetAddress2: existingFormData.billingAddress.streetAddress2,
      city: existingFormData.billingAddress.city,
      state: existingFormData.billingAddress.state,
      zipcode: existingFormData.billingAddress.zipcode,
      country: existingFormData.billingAddress.country,
    };
  } else {
    selectedBillingAddress = {
      billingAddressId: defaultBillingAddress.id,
      streetAddress1: defaultBillingAddress.streetAddress1,
      streetAddress2: defaultBillingAddress.streetAddress2,
      city: defaultBillingAddress.city,
      state: defaultBillingAddress.state,
      zipcode: defaultBillingAddress.zipcode,
      country: defaultBillingAddress.country,
    };
  }
  const [selectedAddress, setSelectedAddress] = useState(
    selectedBillingAddress
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...selectedAddress,
    },
  });

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  useEffect(() => {
    if (!isAddingNewAddress) {
      reset({
        billingAddressId: selectedAddress.billingAddressId,
        streetAddress1: selectedAddress.streetAddress1,
        streetAddress2: selectedAddress.streetAddress2,
        city: selectedAddress.city,
        state: selectedAddress.state,
        zipcode: selectedAddress.zipcode,
        country: selectedAddress.country,
      });
    }
  }, [selectedAddress, reset, isAddingNewAddress]);

  async function processData(data) {
    let billingFormData = {};
    if (!data.billingAddressId) {
      const newAddressData = {
        userId: existingFormData?.userId,
        streetAddress1: data.streetAddress1,
        streetAddress2: data.streetAddress2,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        country: data.country,
        defaultBilling: false,
        defaultShipping: false,
      };
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await fetch(`${baseUrl}/api/customer/address`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAddressData),
        });

        const newAddedAddresses = await response.json();
        const newAddressId = newAddedAddresses[0]?.id;

        if (response.ok) {
          billingFormData = {
            billingAddress: {
              billingAddressId: newAddressId,
              streetAddress1: data.streetAddress1,
              streetAddress2: data.streetAddress2,
              city: data.city,
              state: data.state,
              zipcode: data.zipcode,
              country: data.country,
            },
          };
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      billingFormData = {
        billingAddress: {
          billingAddressId: selectedAddress.billingAddressId,
          streetAddress1: data.streetAddress1,
          streetAddress2: data.streetAddress2,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          country: data.country,
        },
      };
    }

    console.log(billingFormData);
    // Update the checkout data
    dispatch(updateCheckoutFormData(billingFormData));
    // Update the current step
    dispatch(setCurrentStep(currentStep + 1));
  }

  return (
    <div>
      <div className="mb-4 border-b border-gray-50">
        {/* Address Selection Dropdown */}
        {isAddingNewAddress && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => {
                setIsAddingNewAddress(false);
                reset({
                  billingAddressId: selectedAddress.billingAddressId,
                  streetAddress1: selectedAddress.streetAddress1,
                  streetAddress2: selectedAddress.streetAddress2,
                  city: selectedAddress.city,
                  state: selectedAddress.state,
                  zipcode: selectedAddress.zipcode,
                  country: selectedAddress.country,
                });
              }}
              className="mt-4 w-full p-2 border border-primary rounded-md bg-primary text-white hover:bg-white hover:text-gray-900"
            >
              Select From Addresses
            </button>
          </div>
        )}

        {!isAddingNewAddress && currentAddresses.length > 0 && (
          <div className="flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <div>
                <label
                  htmlFor="addressSelect"
                  className="block text-sm font-medium text-gray-50"
                >
                  Select Billing Address from your Address Book
                </label>
                <select
                  id="addressSelect"
                  className="mt-2 block w-full p-4 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-800"
                  value={selectedAddress?.billingAddressId || ""}
                  onChange={(e) => {
                    const selected = currentAddresses.find(
                      (address) => address.id === e.target.value
                    );
                    setSelectedAddress({
                      billingAddressId: selected.id,
                      streetAddress1: selected.streetAddress1,
                      streetAddress2: selected.streetAddress2,
                      city: selected.city,
                      state: selected.state,
                      zipcode: selected.zipcode,
                      country: selected.country,
                    });
                  }}
                >
                  {currentAddresses.map((address) => (
                    <option
                      key={address.id}
                      value={address.id}
                      selected={address.id === selectedAddress.billingAddressId}
                    >
                      {address.streetAddress1}
                      {address.streetAddress2 &&
                        " " + address.streetAddress2 + ", "}
                      {address.city}, {address.state}, {address.zipcode},{" "}
                      {address.country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNewAddress(true);
                    reset({
                      billingAddressId: "",
                      streetAddress1: "",
                      streetAddress2: "",
                      city: "",
                      state: "",
                      zipcode: "",
                      country: "",
                    });
                  }}
                  className="mt-7 w-full p-4 border border-primary rounded-md bg-primary text-white hover:bg-white hover:text-gray-900"
                >
                  Add New Address
                </button>
              </div>
            </div>
          </div>
        )}

        {!isAddingNewAddress && currentAddresses.length === 0 && (
          <div>
            <button
              type="button"
              onClick={() => {
                setIsAddingNewAddress(true);
                reset({
                  billingAddressId: "",
                  streetAddress1: "",
                  streetAddress2: "",
                  city: "",
                  state: "",
                  zipcode: "",
                  country: "",
                });
              }}
              className="mt-4 w-full p-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-100"
            >
              Add New Address
            </button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(processData)}>
        <h2 className="text-xl font-semibold mb-4 dark:text-primary">
          Billing Address
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label={"Location"}
            name={"streetAddress1"}
            reset={reset}
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label={"Unit # if any"}
            name={"streetAddress2"}
            reset={reset}
            register={register}
            errors={errors}
            className="w-full"
          />
          <TextInput
            label={"City"}
            name={"city"}
            reset={reset}
            register={register}
            errors={errors}
          />
          <SelectInput
            label={"State/Province"}
            name={"state"}
            register={register}
            options={states}
            className="w-full"
          />
          <SelectInput
            label={"Country"}
            name={"country"}
            register={register}
            options={countries}
            className="w-full"
          />
          <TextInput
            label={"Zip Code"}
            name={"zipcode"}
            reset={reset}
            register={register}
            errors={errors}
            className="w-full"
          />
        </div>
        <NavButtons />
      </form>
    </div>
  );
}
