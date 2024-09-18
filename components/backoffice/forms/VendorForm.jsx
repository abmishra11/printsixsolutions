"use client";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextareaInput from "@/components/forminputs/TextAreaInput";
import TextInput from "@/components/forminputs/TextInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function VendorForm({ updateData = {} }) {
  const vendorId = updateData?.id ?? "";

  const [loading, setLoading] = useState(false);

  const onFileChange = (file) => {
    setImageFile(file);
  };

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  const isActive = watch("isActive");

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/vendors");
  }

  async function onSubmit(data) {
    {
      /*
      -id => auto()
      -title
      -code => auto()
      -expiryDate
      */
    }
    setLoading(true);
    const code = generateUserCode(data.title, data.expiryDate);
    data.couponCode = couponCode;
    console.log(data);
    if (vendorId) {
      // Make put request to update vendor
      makePutRequest(
        setLoading,
        `api/vendors/${vendorId}`,
        data,
        "Product",
        redirect
      );
    } else {
      makePostRequest(setLoading, "api/vendors", data, "Vendors", reset);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      method="post"
      encType="multipart/form-data"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label={"Staff Full Name"}
          name={"name"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Username"}
          name={"username"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Date of Birth"}
          name={"dob"}
          type="date"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Password"}
          name={"password"}
          type="password"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Staff's Email Address"}
          name={"email"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Staff's Phone"}
          name={"phone"}
          type="tel"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Staff's Physical Address"}
          name={"physicalAddress"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextareaInput
          label={"Notes"}
          name={"notes"}
          register={register}
          errors={errors}
          isRequired={false}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={vendorId ? "Update Vendor" : "Create Vendor"}
        loadingButtonTitle={
          vendorId
            ? "Updating vendor please wait..."
            : "Creating vendor please wait..."
        }
      />
    </form>
  );
}
