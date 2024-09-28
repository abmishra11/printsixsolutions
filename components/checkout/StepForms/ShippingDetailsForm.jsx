"use client";
import TextInput from "@/components/forminputs/TextInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import NavButtons from "../NavButtons";
import { Circle, Truck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentStep,
  updateCheckoutFormData,
} from "@/redux/slices/checkoutSlice";
import SelectInput from "@/components/forminputs/SelectInput";

export default function ShippingDetailsForm({ addresses }) {
  let defaultShippingAddress = {};
  if (addresses.length > 0) {
    const shippingAddress = addresses.filter(
      (address) => address.defaultShipping === true
    );
    defaultShippingAddress = shippingAddress[0];
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

  const dispatch = useDispatch();
  const currentStep = useSelector((store) => store.checkout.currentStep);
  const existingFormData = useSelector(
    (store) => store.checkout.checkoutFormData
  );

  let selectedShippingAddress = {};
  if (existingFormData.shippingAddress) {
    selectedShippingAddress = {
      shippingAddressId: existingFormData.shippingAddress.shippingAddressId,
      streetAddress1: existingFormData.shippingAddress.streetAddress1,
      streetAddress2: existingFormData.shippingAddress.streetAddress2,
      city: existingFormData.shippingAddress.city,
      state: existingFormData.shippingAddress.state,
      zipcode: existingFormData.shippingAddress.zipcode,
      country: existingFormData.shippingAddress.country,
    };
  } else {
    selectedShippingAddress = {
      shippingAddressId: defaultShippingAddress.id,
      streetAddress1: defaultShippingAddress.streetAddress1,
      streetAddress2: defaultShippingAddress.streetAddress2,
      city: defaultShippingAddress.city,
      state: defaultShippingAddress.state,
      zipcode: defaultShippingAddress.zipcode,
      country: defaultShippingAddress.country,
    };
  }
  const [selectedAddress, setSelectedAddress] = useState(
    selectedShippingAddress
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

  const initialShippingCost = existingFormData.shippingCost || "";
  const [shippingCost, setShippingCost] = useState(initialShippingCost);

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

  useEffect(() => {
    if (!isAddingNewAddress) {
      reset({
        shippingAddressId: selectedAddress.shippingAddressId,
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
    let shippingFormData = {};
    if (!data.shippingAddressId) {
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
          console.log("newAddressId", newAddressId);

          shippingFormData = {
            shippingAddress: {
              shippingAddressId: newAddressId,
              streetAddress1: data.streetAddress1,
              streetAddress2: data.streetAddress2,
              city: data.city,
              state: data.state,
              zipcode: data.zipcode,
              country: data.country,
            },
            newAddedAddresses: newAddedAddresses,
            shippingCost: shippingCost,
          };
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      shippingFormData = {
        shippingAddress: {
          shippingAddressId: selectedAddress.shippingAddressId,
          streetAddress1: data.streetAddress1,
          streetAddress2: data.streetAddress2,
          city: data.city,
          state: data.state,
          zipcode: data.zipcode,
          country: data.country,
        },
        newAddedAddresses: [],
        shippingCost: shippingCost,
      };
    }

    console.log("shippingFormData", shippingFormData);
    // Update the checkout data
    dispatch(updateCheckoutFormData(shippingFormData));
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
                  shippingAddressId: selectedAddress.shippingAddressId,
                  streetAddress1: selectedAddress.streetAddress1,
                  streetAddress2: selectedAddress.streetAddress2,
                  city: selectedAddress.city,
                  state: selectedAddress.state,
                  zipcode: selectedAddress.zipcode,
                  country: selectedAddress.country,
                });
              }}
              className="mt-4 w-full p-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-100"
            >
              Select From Addresses
            </button>
          </div>
        )}

        {!isAddingNewAddress && addresses.length > 0 && (
          <div className="flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="w-full md:w-auto">
              <label
                htmlFor="addressSelect"
                className="block text-sm font-medium text-gray-50"
              >
                Select Shipping Address from your Address Book
              </label>
              <select
                id="addressSelect"
                className="mt-2 block w-full p-4 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-slate-800"
                value={selectedAddress?.shippingAddressId || ""}
                onChange={(e) => {
                  const selected = addresses.find(
                    (address) => address.id === e.target.value
                  );
                  setSelectedAddress({
                    shippingAddressId: selected.id,
                    streetAddress1: selected.streetAddress1,
                    streetAddress2: selected.streetAddress2,
                    city: selected.city,
                    state: selected.state,
                    zipcode: selected.zipcode,
                    country: selected.country,
                  });
                }}
              >
                {addresses.map((address) => (
                  <option
                    key={address.id}
                    value={address.id}
                    selected={address.id === selectedAddress.shippingAddressId}
                    className="p-4"
                  >
                    {address.streetAddress1}
                    {address.streetAddress2 && " " + address.streetAddress2 + ", "}
                    {address.city}, {address.state}, {address.zipcode}, {address.country}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-7 md:ml-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddingNewAddress(true);
                  reset({
                    shippingAddressId: "",
                    streetAddress1: "",
                    streetAddress2: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    country: "",
                  });
                }}
                className="w-full p-4 border border-primary rounded-md bg-primary text-white hover:bg-white hover:text-gray-900"
              >
                Add New Address
              </button>
            </div>
          </div>
          </div>
        )}

        {!isAddingNewAddress && addresses.length === 0 && (
          <div>
            <button
              type="button"
              onClick={() => {
                setIsAddingNewAddress(true);
                reset({
                  shippingAddressId: "",
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
        )}
      </div>
      <form onSubmit={handleSubmit(processData)}>
        <h2 className="text-xl font-semibold mb-4 dark:text-primary">
          Shipping Address
        </h2>
        {/* Form Fields */}
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

        {/* Shipping Cost */}
        <div className="col-span-full">
          <h3 className="mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">
            Shipping Cost ?
          </h3>
          <ul className="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="cheap"
                name="shippingCost"
                value="8"
                className="hidden peer"
                required
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="cheap"
                className="inline-flex items-center justify-between w-full p-5 text-white bg-white border border-gray-200 rounded-lg cursor-pointer dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary dark:text-white dark:bg-gray-800"
              >
                {/* Design the Label */}
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div className="">
                    <p>UPS</p>
                    <p>Delivery Cost: $8</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="expensive"
                name="shippingCost"
                value="20"
                className="hidden peer"
                required
                onChange={(e) => setShippingCost(e.target.value)}
              />
              <label
                htmlFor="expensive"
                className="inline-flex items-center justify-between w-full p-5 text-white bg-white border border-gray-200 rounded-lg cursor-pointer dark:peer-checked:text-primary peer-checked:border-primary peer-checked:text-primary dark:text-white dark:bg-gray-800"
              >
                {/* Design the Label */}
                <div className="flex gap-2 items-center">
                  <Truck className="w-8 h-8 ms-3 flex-shrink-0" />
                  <div className="">
                    <p>UPS</p>
                    <p>Delivery Cost: $16</p>
                  </div>
                </div>
                <Circle className="w-5 h-5 ms-3 flex-shrink-0" />
              </label>
            </li>
          </ul>
        </div>

        <NavButtons />
      </form>
    </div>
  );
}
