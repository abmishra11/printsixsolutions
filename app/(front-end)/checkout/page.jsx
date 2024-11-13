import CartBanner from "@/components/checkout/CartBanner";
import StepForm from "@/components/checkout/StepForm";
import Steps from "@/components/checkout/Steps";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const user = session?.user;
  const userid = user.id;

  const userData = await getData(`userprofile/${userid}`);
  const addresses = await getData(`customer/address/customeraddress/${userid}`);
  const steps = [
    {
      number: 1,
      title: "Personal Details",
    },
    {
      number: 2,
      title: "Shipping Address Details",
    },
    {
      number: 3,
      title: "Billing Address Details",
    },
    {
      number: 4,
      title: "Payment Method",
    },
    {
      number: 5,
      title: "Order Summary",
    },
  ];

  return (
    <div className="bg-slate-200 dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl my-6 mx-auto bg-white dark:bg-slate-950 border border-slate-700 p-6 rounded-lg">
        {/* STEPS */}
        <Steps steps={steps} />
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          {/* BANNER */}
          <CartBanner />
          {/* FORM */}
          <StepForm addresses={addresses} userData={userData} />
        </div>
      </div>
    </div>
  );
}
