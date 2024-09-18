import VerifyUser from "@/components/frontend/VerifyUser";
import { getData } from "@/lib/getData";
import React from "react";

export default async function Page({ params: { id } }) {
  const user = await getData(`users/${id}`);
  return <VerifyUser user={user} />;
}
