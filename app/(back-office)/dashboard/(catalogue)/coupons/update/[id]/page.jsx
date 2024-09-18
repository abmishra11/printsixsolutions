import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import CouponForm from "@/components/backoffice/forms/CouponForm";
import { getData } from "@/lib/getData";

export default async function UpdateCategory({ params: { id } }) {
  const coupon = await getData(`coupons/${id}`);
  return (
    <div>
      <FormHeader title={"Update Coupon"} />
      <CouponForm updateData={coupon} />
    </div>
  );
}
