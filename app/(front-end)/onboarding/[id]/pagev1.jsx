import NewVendorForm from "@/components/backoffice/NewVendorForm";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { id } }) {
  const user = await getData(`users/${id}`);
  return (
    <div className="flex flex-col gap-6 p-16">
      <div className="max-w-4xl p-4 mx-auto">
        <h2>Hello {user.name}, Tell us more about your self</h2>
      </div>
      <NewVendorForm user={user} />
    </div>
  );
}
