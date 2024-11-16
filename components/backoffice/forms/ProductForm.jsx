"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import ArrayItemsInput from "@/components/forminputs/ArrayItemsInput";
import MultipleImageInput from "@/components/forminputs/MultipleImageInput";
import SelectInput from "@/components/forminputs/SelectInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextareaInput from "@/components/forminputs/TextAreaInput";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";

export default function ProductForm({ categories, vendor, updateData = {} }) {
  const [loading, setLoading] = useState(false);
  const productId = updateData?.id ?? "";

  const initialTags = updateData?.tags ?? [];
  const [tags, setTags] = useState(initialTags);

  const initialImageUrls = updateData?.productImages ?? [];
  const [productImages, setProductImages] = useState(initialImageUrls);

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
      ...updateData,
      isWholesale: updateData?.isWholesale ?? false,
      isActive: updateData?.isActive ?? false,
    },
  });

  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/products");
  }

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (updateData.categoryId) {
      const initialCategoryId = updateData.categoryId;
      const isSubCategory = categories.some(
        (cat) => cat.id === initialCategoryId && cat.parentId !== null
      );

      if (isSubCategory) {
        // Find the parent category
        const subCategory = categories.find(
          (cat) => cat.id === initialCategoryId
        );

        const parentCategory = categories.find(
          (cat) => cat.id === subCategory.parentId
        );

        setSelectedCategory(parentCategory);

        setSubCategories(
          categories.filter((cat) => cat.parentId === parentCategory.id)
        );
        setSelectedSubCategory(subCategory);
        setValue("categoryId", parentCategory.id);
        setValue("subCategoryId", subCategory.id);
      } else {
        // It is a parent category
        const parentCategory = categories.find(
          (cat) => cat.id === initialCategoryId
        );
        setSelectedCategory(parentCategory);
        setSubCategories(
          categories.filter((cat) => cat.parentId === initialCategoryId)
        );
        setValue("categoryId", parentCategory.id);
        setSelectedSubCategory(null);
      }
    } else {
      // New product form: select the first category by default
      const firstCategory = categories.find((cat) => cat.parentId === null);
      if (firstCategory) {
        setSelectedCategory(firstCategory);
        setValue("categoryId", firstCategory.id);
        const initialSubCategories = categories.filter(
          (cat) => cat.parentId === firstCategory._id
        );
        setSubCategories(initialSubCategories);
      }
    }
  }, [setValue]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((cat) => cat.id === categoryId);
    setSelectedCategory(category);
    setValue("categoryId", categoryId);

    // Filter and set sub-categories
    const filteredSubCategories = categories.filter(
      (cat) => cat.parentId === categoryId
    );
    setSubCategories(filteredSubCategories);
    setSelectedSubCategory(
      filteredSubCategories.length ? filteredSubCategories[0] : null
    );
    setValue(
      "subCategoryId",
      filteredSubCategories.length ? filteredSubCategories[0].id : ""
    );
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryId = e.target.value;
    setSelectedSubCategory(
      subCategories.find((cat) => cat._id === subCategoryId)
    );
    setValue("subCategory", subCategoryId);
  };

  async function onSubmit(data) {
    console.log("Form data:", data);
    console.log("Uploaded image URLs:", productImages);
    setLoading(true);

    try {
      const slug = generateSlug(data.title);
      const productCode = generateUserCode("printsix", data.title);
      if (data.barcode === "") {
        data.barcode = null;
      }
      if (data.subCategoryId) {
        data.categoryId = data.subCategoryId;
      }

      data.slug = slug;
      data.imageUrl = productImages[0];
      data.productImages = productImages;
      data.tags = tags;
      data.productCode = productCode;
      data.qty = 1;
      if (!productId) {
        data.userId = vendor.id;
      }

      console.log("Final Submitted Data:", data);

      if (productId) {
        makePutRequest(
          setLoading,
          `api/products/${productId}`,
          data,
          "Product",
          redirect
        );
      } else {
        makePostRequest(
          setLoading,
          "api/products",
          data,
          "Product",
          reset,
          redirect
        );
      }
    } catch (error) {
      console.error("Error while creating product", error);
      alert("An error occurred while creating product.");
    }

    setLoading(false);
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
          label={"Product Title"}
          name={"title"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Product SKU"}
          name={"sku"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Product Barcode"}
          name={"barcode"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
          isRequired={false}
        />
        <TextInput
          label={"Product Price (Before Discount)"}
          name={"productPrice"}
          type="number"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Product Sale Price (Discounted)"}
          name={"salePrice"}
          type="number"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label={"Product Stock"}
          name={"productStock"}
          type="number"
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />

        <SelectInput
          label={"Select Category"}
          name={"categoryId"}
          register={register}
          errors={errors}
          options={categories.filter((cat) => cat.parentId === null)}
          multipleSelect={false}
          className="w-full"
          onChange={handleCategoryChange}
        />

        {/* Sub-category Select Input */}
        {subCategories.length > 0 && (
          <SelectInput
            label={"Select Sub Category"}
            name={"subCategoryId"}
            register={register}
            errors={errors}
            options={subCategories}
            multipleSelect={false}
            className="w-full"
            onChange={handleSubCategoryChange}
          />
        )}

        <ToggleInput
          label={"* Supports Wholesale Selling ?"}
          name="isWholesale"
          trueTitle={"Supported"}
          falseTitle={"Not Supported"}
          control={control}
        />
        {isWholesale && (
          <>
            <TextInput
              label={"Whole Sale Price"}
              name={"wholesalePrice"}
              type="number"
              reset={reset}
              register={register}
              errors={errors}
              className="w-full"
            />
            <TextInput
              label={"Minimum Whole Sale Quantity"}
              name={"wholesaleQty"}
              type="number"
              reset={reset}
              register={register}
              errors={errors}
              className="w-full"
            />
          </>
        )}

        <TextInput
          label={"Unit of Measurement (e.g., Kilogram)"}
          name={"unit"}
          reset={reset}
          register={register}
          errors={errors}
          className="w-full"
        />

        <ArrayItemsInput
          setItems={setTags}
          items={tags}
          itemTitle={"Tag"}
          className="w-full"
        />

        <MultipleImageInput
          label={"Product Images"}
          name={"productImages"}
          reset={reset}
          register={register}
          errors={errors}
          imageFiles={productImages}
          setImageFiles={setProductImages}
          folderName={"productimage"}
          isRequired={true}
        />

        <TextareaInput
          label={"Product Description"}
          name={"description"}
          reset={reset}
          register={register}
          errors={errors}
        />

        <ToggleInput
          label={"* Publish Your Product"}
          name="isActive"
          trueTitle={"Active"}
          falseTitle={"Draft"}
          control={control}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={productId ? "Update Product" : "Create Product"}
        loadingButtonTitle={
          productId
            ? "Updating Product please wait..."
            : "Creating Product please wait..."
        }
      />
    </form>
  );
}
