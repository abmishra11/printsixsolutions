"use client";
import FormHeader from "@/components/backoffice/FormHeader";
import ImageInput from "@/components/forminputs/ImageInput";
import SelectInput from "@/components/forminputs/SelectInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextareaInput from "@/components/forminputs/TextAreaInput";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewMarketForm({ categories }) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function onFileChange(file) {
    setLoading(true);
    const formData = new FormData();
    formData.append("marketimage", file);
    formData.append("filename", "marketimage");
    formData.append("folder", "marketimage");

    try {
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Image uploaded successfully!");
        setImageUrl(responseData.imageUrl);
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading image.");
    } finally {
      setLoading(false);
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
    },
  });

  const isActive = watch("isActive");

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/markets");
  }

  async function onSubmit(data) {
    {
      /*
        - id => auto()
        - title
        - slug => auto()
        - logo
        - description
       */
    }

    setLoading(true);

    try {
      const slug = generateSlug(data.title);
      data.slug = slug;
      data.logoUrl = imageUrl;
      console.log(data);
      makePostRequest(
        setLoading,
        "api/markets",
        data,
        "Market",
        reset,
        redirect
      );
      setImageUrl("");
    } catch (error) {
      console.error("Error while creating market", error);
      alert("An error occurred while creating market");
    }
    setLoading(false);
  }

  return (
    <div>
      <FormHeader title={"New Market"} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label={"Market Title"}
            name={"title"}
            reset={reset}
            register={register}
            errors={errors}
          />
          <SelectInput
            label={"Select Categories"}
            name={"categoryIds"}
            register={register}
            errors={errors}
            options={categories}
            multipleSelect={true}
            className="w-full"
          />

          <ImageInput
            label={"Market Logo"}
            name={"marketLogo"}
            reset={reset}
            register={register}
            errors={errors}
            onFileChange={onFileChange}
          />

          <TextareaInput
            label={"Market Description"}
            name={"description"}
            reset={reset}
            register={register}
            errors={errors}
          />

          <ToggleInput
            label={"Market Status"}
            name="isActive"
            register={register}
            trueTitle={"Active"}
            falseTitle={"Draft"}
          />
        </div>
        <SubmitButton
          isLoading={loading}
          buttonTitle={"Create Market"}
          loadingButtonTitle={"Creating market please wait..."}
        />
      </form>
    </div>
  );
}
