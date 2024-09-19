import FormHeader from "@/components/backoffice/FormHeader";
import CouponForm from "@/components/backoffice/forms/CouponForm";

export default function NewCoupon() {
  if (typeof window === "undefined") {
    return null; // Don't render anything on the server
  }

  return (
    <div>
      <FormHeader title={"New Coupon"} />
      <CouponForm />
    </div>
  );
}
