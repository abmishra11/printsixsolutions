import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";
import CustomerForm from "@/components/backoffice/forms/CustomerForm";

export default async function page({ params: { id } }) {
  const user = await getData(`users/${id}`);
  return (
    <div>
      <FormHeader title={"Update Customer"} />
      <CustomerForm userProfile={user?.profile} />
    </div>
  );
}
