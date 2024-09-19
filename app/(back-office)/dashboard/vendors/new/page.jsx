import FormHeader from "@/components/backoffice/FormHeader";
import VendorForm from "@/components/backoffice/forms/VendorForm";

export default function NewVendor() {
  return (
    <div>
      <FormHeader title={"New Vendor"} />
      <VendorForm />
    </div>
  );
}
