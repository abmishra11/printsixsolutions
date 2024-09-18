import FormHeader from "@/components/backoffice/FormHeader";
import CouponForm from "@/components/backoffice/forms/CouponForm";

export default function NewCoupon() {
  return (
    <div>
      <FormHeader title={"New Coupon"} />
      <CouponForm />
    </div>
  );
}
