"use client";
import ArrayItemsInput from "@/components/forminputs/ArrayItemsInput";
import ImageInput from "@/components/forminputs/ImageInput";
import SelectInput from "@/components/forminputs/SelectInput";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextareaInput from "@/components/forminputs/TextAreaInput";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewProductForm({
  categories,
  vendors,
  updateData = {},
}) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const productId = updateData?.id ?? "";

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productImage, setProductImage] = useState(initialImageUrl);

  async function onFileChange(file) {
    setLoading(true);
    const formData = new FormData();
    formData.append("productimage", file);
    formData.append("filename", "productimage");
    formData.append("folder", "productimage");

    try {
      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Image uploaded successfully!");
        setProductImage(responseData.imageUrl);
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
      isWholesale: false,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");

  const router = useRouter();
  function redirect() {
    router.push("/dashboard/products");
  }

  async function onSubmit(data) {
    {
      /*
        -id => auto()
        -title
        -slug => auto()
        description
        image/images[]
        sku
        barcode
        productPrice
        salePrice
        category
        vendor
        tags[]
       */
    }

    setLoading(true);

    try {
      const slug = generateSlug(data.title);
      const productCode = generateUserCode("printsix", data.title);
      data.slug = slug;
      data.imageUrl = productImage;
      data.tags = tags;
      data.productCode = productCode;
      data.qty = 1;
      data.userId = data.vendorId;
      console.log(data);

      if (productId) {
        // Make put request to update product
        makePutRequest(
          setLoading,
          `api/products/${productIdId}`,
          data,
          "Product",
          redirect
        );
      } else {
        // Make post request to create product
        makePostRequest(
          setLoading,
          "api/products",
          data,
          "Product",
          reset,
          redirect
        );
        setProductImage("");
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
          options={categories}
          multipleSelect={false}
          className="w-full"
        />
        <SelectInput
          label={"Select Vendor"}
          name={"vendorId"}
          register={register}
          errors={errors}
          options={vendors}
          multipleSelect={false}
          className="w-full"
        />
        <ToggleInput
          label={"Supports Wholesale Selling"}
          name="isWholesale"
          trueTitle={"Supported"}
          falseTitle={"Not Supported"}
          register={register}
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
          label={"Unit of Measurement(eg Killogram)"}
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
        <ImageInput
          label={"Product Image"}
          name={"productImage"}
          reset={reset}
          register={register}
          errors={errors}
          onFileChange={onFileChange}
          imageFile={productImage}
          setImageFile={setProductImage}
        />

        <TextareaInput
          label={"Product Description"}
          name={"description"}
          reset={reset}
          register={register}
          errors={errors}
        />

        <ToggleInput
          label={"Publish Your Product"}
          name="isActive"
          register={register}
          trueTitle={"Active"}
          falseTitle={"Draft"}
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
