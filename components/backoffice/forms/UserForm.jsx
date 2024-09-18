"use client";
import ImageInput from "@/components/forminputs/ImageInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextInput from "@/components/forminputs/TextInput";
import { makePutRequest } from "@/lib/apiRequest";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function UserForm({ userProfile }) {
  const [loading, setLoading] = useState(false);
  const [customerImageFile, setCustomerImageFile] = useState(
    userProfile?.profileImageUrl
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      dateOfBirth: userProfile.dateOfBirth
        ? convertIsoDateToNormal(userProfile.dateOfBirth)
        : null,
      profileImageUrl: userProfile.profileImageUrl,
    },
  });

  const router = useRouter();
  function redirect() {
    router.push("/dashboard");
  }

  async function onSubmit(data) {
    try {
      setLoading(true);
      data.userId = userProfile?.id;
      data.profileImageUrl = customerImageFile;
      console.log(data);
      makePutRequest(
        setLoading,
        `api/userprofile/${userProfile?.id}`,
        data,
        "Customer Profile",
        redirect
      );
    } catch (error) {
      console.error("Error in updating vendor profile:", error);
      alert("An error occurred while updating vendor profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      method="post"
      encType="multipart/form-data"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Update Profile Details
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b border-gray-700">
        <TextInput
          label={"Full Name"}
          name={"name"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Email Address"}
          name={"email"}
          type="email"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Phone Number"}
          name={"phone"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Date of Birth"}
          name={"dateOfBirth"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
          type="date"
        />
        <ImageInput
          label={"Customer's Profile Image"}
          name={"profileImageUrl"}
          reset={reset}
          register={register}
          errors={errors}
          imageFile={customerImageFile}
          setImageFile={setCustomerImageFile}
          folderName={"userimage"}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={"Update Profile Details"}
        loadingButtonTitle={"Updating customer profile please wait..."}
      />
    </form>
  );
}
