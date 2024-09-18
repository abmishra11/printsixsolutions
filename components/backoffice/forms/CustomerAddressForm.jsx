"use client";
import SelectInput from "@/components/forminputs/SelectInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CustomerAddressForm({ user, updateAddress = {} }) {
  const [loading, setLoading] = useState(false);
  const addressId = updateAddress?.id ?? "";
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

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    defaultValues: {
      ...updateAddress,
    },
  });

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/customer/addresses");
  }

  async function onSubmit(data) {
    try {
      setLoading(true);
      data.userId = user?.id;
      if (addressId) {
        // Make put request to update product
        makePutRequest(
          setLoading,
          `api/customer/address/${addressId}`,
          data,
          "Customer Address",
          redirect
        );
      } else {
        makePostRequest(
          setLoading,
          `api/customer/address`,
          data,
          "Customer Address",
          reset,
          redirect
        );
      }
    } catch (error) {
      console.error("Error in adding new address", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      method="post"
    >
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
        <ToggleInput
          label={"Make this my default billing address"}
          name={"defaultBilling"}
          trueTitle={"Default Billing Address"}
          falseTitle={"Billing Address"}
          register={register}
          control={control}
        />
        <ToggleInput
          label={"Make this my default shipping address"}
          name={"defaultShipping"}
          trueTitle={"Default Shipping Address"}
          falseTitle={"Shipping Address"}
          register={register}
          control={control}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={addressId ? "Update Address" : "Add New Address"}
        loadingButtonTitle={
          addressId
            ? "Updating Address please wait..."
            : "Adding New Address please wait..."
        }
      />
    </form>
  );
}
