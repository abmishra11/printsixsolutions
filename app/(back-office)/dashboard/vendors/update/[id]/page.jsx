import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import VendorForm from "@/components/backoffice/forms/VendorForm";
import { getData } from "@/lib/getData";

export default async function UpdateVendor({ params: { id } }) {
  const vendor = await getData(`vendors/${id}`);
  return (
    <div>
      <FormHeader title={"Update Vendor"} />
      <VendorForm updateData={vendor} />
    </div>
  );
}
