"use client";
import TextInput from "@/components/forminputs/TextInput";
import { makePostRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ImageInput from "../forminputs/ImageInput";
import TextareaInput from "../forminputs/TextAreaInput";
import ToggleInput from "../forminputs/ToggleInput";
import SubmitButton from "../forminputs/SubmitButton";
import ArrayItemsInput from "../forminputs/ArrayItemsInput";

export default function NewVendorForm({ user }) {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [vendorImageFile, setVendorImageFile] = useState();

  async function onFileChange(file) {
    const formData = new FormData();
    console.log(file);
    formData.append("vendorimage", file);
    formData.append("filename", "vendorimage");
    formData.append("folder", "vendorimage");
    try {
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Vendor Image Uploaded Successfully!");
        setVendorImageFile(responseData.imageUrl);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading image.");
    }
  }

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...user,
    },
  });

  const router = useRouter();
  function redirect() {
    router.push("/login");
  }

  const isActive = watch("isActive");

  async function onSubmit(data) {
    try {
      setLoading(true);
      const code = "123456";
      data.code = code;
      data.userId = user?.id;
      data.products = products;
      data.profileImageUrl = vendorImageFile;
      console.log(data);
      makePostRequest(
        setLoading,
        "api/vendors",
        data,
        "Vendor Profile",
        reset,
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
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label={"Vendor's Full Name"}
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Phone"}
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Email Address"}
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Physical Address"}
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Contact Person"}
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Vendor's Contact Person Phone"}
          name="contactPersonPhone"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle={"Products"}
        />
        <ImageInput
          label={"Vendor's Profile Image"}
          name={"profileImageUrl"}
          reset={reset}
          register={register}
          errors={errors}
          onFileChange={onFileChange}
          imageFile={vendorImageFile}
          setImageFile={setVendorImageFile}
        />
        <TextareaInput
          label={"Vendor's Payment Term"}
          name={"terms"}
          register={register}
          errors={errors}
        />
        <TextareaInput
          label={"Notes"}
          name={"notes"}
          register={register}
          errors={errors}
        />
        <ToggleInput
          label={"Vendor Status"}
          name="isActive"
          register={register}
          trueTitle={"Active"}
          falseTitle={"Draft"}
        />
        <SubmitButton
          isLoading={loading}
          buttonTitle={"Update Details"}
          loadingButtonTitle={"Updating Vendor's Details please wait..."}
        />
      </div>
    </form>
  );
}
