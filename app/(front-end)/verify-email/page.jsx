import { getData } from "@/lib/getData";
import { Info } from "lucide-react";
import React from "react";

export default async function page({ searchParams }) {
  const { userId } = searchParams;
  const user = await getData(`users/${userId}`);
  const { email } = user;
  console.log(userId);
  return (
    <div className="max-w-3xl mx-auto min-h-screen flex items-center">
      <div
        id="alert-additional-content-3"
        className="p-8 mb-4 text-gray-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-gray-100"
        role="alert"
      >
        <div className="flex items-center mb-4">
          <Info className="flex-shrink-0 w-4 h-4 me-2" />
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">
            Verification email sent to your email, Please verify your account
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm">
          Thank you for creating an account with us, we have sent you an email
          to <span className="font-bold text-blue-600">{email}</span>, check in
          your inbox and click on the link to complete your onboarding process{" "}
        </div>
      </div>
    </div>
  );
}
