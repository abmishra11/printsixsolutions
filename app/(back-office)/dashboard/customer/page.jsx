import CustomerProfile from "@/components/backoffice/customer/CustomerProfile";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const { user } = session;
  const userProfile = await getData(`userprofile/${user.id}`);
  return <CustomerProfile userProfile={userProfile} />;
}
