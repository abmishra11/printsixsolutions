"use client";
import ImageInput from "@/components/forminputs/ImageInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function BannerForm({ updateData = {} }) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const bannerId = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

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
  function redirectFunction() {
    router.push("/dashboard/banners");
  }

  async function onFileChange(file) {
    const formData = new FormData();
    console.log(file);
    formData.append("bannerimage", file);
    formData.append("filename", "bannerimage");
    formData.append("folder", "bannerimage");
    try {
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Banner Image Uploaded Successfully!");
        setImageUrl(responseData.imageUrl);
      } else {
        alert("Failed to upload banner image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading image.");
    }
  }

  async function onSubmit(data) {
    try {
      setLoading(true);
      data.imageUrl = imageUrl;
      if (bannerId) {
        // Make put request to update banner
        makePutRequest(
          setLoading,
          `api/banners/${bannerId}`,
          data,
          "Banner",
          redirectFunction
        );
      } else {
        // Make post request to create banner
        makePostRequest(
          setLoading,
          "api/banners",
          data,
          "Banner",
          reset,
          redirectFunction
        );
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error in creating banner:", error);
      alert("An error occurred while creating banner");
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
          label={"Banner Title"}
          name={"title"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Banner Link"}
          name={"link"}
          type="url"
          reset={reset}
          register={register}
          errors={errors}
        />
        <ImageInput
          label={"Banner Image"}
          name={"bannerimage"}
          reset={reset}
          register={register}
          errors={errors}
          onFileChange={onFileChange}
          imageFile={imageUrl}
          setImageFile={setImageUrl}
        />
        <ToggleInput
          label={"Publish Banner"}
          name="isActive"
          register={register}
          trueTitle={"Active"}
          falseTitle={"Draft"}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={bannerId ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={
          bannerId
            ? "Updating Banner please wait..."
            : "Creating Banner please wait..."
        }
      />
    </form>
  );
}
