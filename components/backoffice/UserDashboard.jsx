import React from "react";
import CustomerProfile from "./customer/CustomerProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";

export default async function UserDashboard({ user }) {
  const userProfile = await getData(`userprofile/${user.id}`);
  console.log("userProfile: ", userProfile);

  return <CustomerProfile userProfile={userProfile} />;
}
