import React, { use } from "react";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import AddressList from "@/components/backoffice/customer/AddressList";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const role = session?.user?.role;
  const userid = session?.user?.id;
  const addresses = await getData(`customer/address/customeraddress/${userid}`);
  return <AddressList addressesArr={addresses} />;
}
