import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import CustomerAddressForm from "@/components/backoffice/forms/CustomerAddressForm";

export default async function Page({ params: { id } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const role = session?.user?.role;
  const userid = session?.user?.id;
  const user = await getData(`users/${userid}`);
  const address = await getData(`customer/address/${id}`);
  console.log("address", address);
  return (
    <div>
      <FormHeader title={"Update Address"} />
      <CustomerAddressForm user={user} updateAddress={address} />
    </div>
  );
}
