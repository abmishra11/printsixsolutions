import React, { use } from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import CustomerAddressForm from "@/components/backoffice/forms/CustomerAddressForm";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const role = session?.user?.role;
  const id = session?.user?.id;
  const user = await getData(`users/${id}`);
  console.log("User", user);
  return (
    <div>
      <FormHeader title={"Add New Address"} />
      <CustomerAddressForm user={user} />
    </div>
  );
}
