"use client";
import ImageInput from "@/components/forminputs/ImageInput";
import SelectInput from "@/components/forminputs/SelectInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextareaInput from "@/components/forminputs/TextAreaInput";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewCategoryForm({ categories, updateData = {} }) {
  console.log("Categories:", categories);

  const categoryId = updateData?.id ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const [imageFile, setImageFile] = useState(initialImageUrl);

  const markets = [
    {
      id: 1,
      title: "Print Six",
    },
    {
      id: 2,
      title: "Print Six Solutions",
    },
  ];
  const [loading, setLoading] = useState(false);

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
      isActive: updateData?.isActive ?? false,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();
  function redirectFunction() {
    router.push("/dashboard/categories");
  }

  async function onSubmit(data) {
    try {
      setLoading(true);
      const slug = generateSlug(data.title);
      data.slug = slug;
      data.imageUrl = imageFile;

      if (data.parentId === "") {
        data.parentId = null;
      }
      console.log("Submitted data", data);
      if (categoryId) {
        data.id = categoryId;
        // Update the category
        makePutRequest(
          setLoading,
          `api/categories/${categoryId}`,
          data,
          "Category",
          redirectFunction
        );
        console.log("Update Request: ", data);
      } else {
        // Create new category
        makePostRequest(
          setLoading,
          "api/categories",
          data,
          "Category",
          reset,
          redirectFunction
        );
        //setImageFile("");
      }
    } catch (error) {
      console.error("Error in creating category:", error);
      alert("An error occurred while creating category");
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
          label={"* Category Title"}
          name={"title"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextareaInput
          label={"* Category Description"}
          name={"description"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <ImageInput
          label={"* Category Image"}
          name={"categoryimage"}
          reset={reset}
          register={register}
          errors={errors}
          imageFile={initialImageUrl}
          setImageFile={setImageFile}
          isRequired={true}
          folderName={"categoryimage"}
        />
        <SelectInput
          label={"Select Parent Category"}
          name={"parentId"}
          register={register}
          options={categories}
          className="w-full"
        />
        <ToggleInput
          label={"* Publish Your Category"}
          name="isActive"
          register={register}
          trueTitle={"Active"}
          falseTitle={"Draft"}
          className="w-full"
          control={control}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={categoryId ? "Update Category" : "Create Category"}
        loadingButtonTitle={
          categoryId
            ? "Updating Category please wait..."
            : "Creating Category please wait..."
        }
      />
    </form>
  );
}
