import React from "react";
import CustomerProfile from "./customer/CustomerProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";

export default async function UserDashboard() {
  const session = await getServerSession(authOptions);
  const { user } = session;
  const userProfile = await getData(`userprofile/${user.id}`);
  return <CustomerProfile userProfile={userProfile} />;
}
