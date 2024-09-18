"use client";
import SubmitButton from "@/components/forminputs/SubmitButton";
import TextInput from "@/components/forminputs/TextInput";
import ToggleInput from "@/components/forminputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { convertIsoDateToNormal } from "@/lib/convertIsoDateToNormal";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function CouponForm({ updateData = {} }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    <p>loading...</p>;
  }
  const vendorId = session?.user?.id;
  const expiryDateNormal = convertIsoDateToNormal(updateData.expiryDate);
  updateData.expiryDate = expiryDateNormal;
  const couponId = updateData?.id ?? "";
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
  function redirectFunction() {
    router.push("/dashboard/coupons");
  }
  async function onSubmit(data) {
    setLoading(true);
    data.vendorId = vendorId;
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
    data.expiryDate = isoFormattedDate;
    data.couponCode = couponCode;
    console.log(data);
    if (couponId) {
      // Make put request to update coupon
      makePutRequest(
        setLoading,
        `api/coupons/${couponId}`,
        data,
        "Coupon",
        redirectFunction
      );
    } else {
      // Make post request to create coupon
      makePostRequest(
        setLoading,
        "api/coupons",
        data,
        "Coupon",
        reset,
        redirectFunction
      );
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
          label={"Coupon Title"}
          name={"title"}
          reset={reset}
          register={register}
          errors={errors}
        />
        <TextInput
          label={"Coupon Expiry Date"}
          name={"expiryDate"}
          type="date"
          reset={reset}
          register={register}
          errors={errors}
        />
        <ToggleInput
          label={"Publish Your Coupon"}
          name="isActive"
          register={register}
          trueTitle={"Active"}
          falseTitle={"Draft"}
        />
      </div>
      <SubmitButton
        isLoading={loading}
        buttonTitle={couponId ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={
          couponId
            ? "Updating Coupon please wait..."
            : "Creating Coupon please wait..."
        }
      />
    </form>
  );
}
