import { getData } from "@/lib/getData";
import React from "react";
import VendorsCarousel from "./VendorsCarousel";

export default async function VendorList() {
  const vendors = await getData("vendors");
  console.log(vendors);
  return (
    <div className="text-white py-16">
      {/* Vendor Slider */}
      <div className="bg-slate-50 dark:bg-lime-900 rounded-lg p-4">
        <h2 className="py-2 text-center text-2xl text-slate-900 dark:text-slate-50 mb-4">
          Shop by Vendor
        </h2>
        <VendorsCarousel vendors={vendors} />
      </div>
    </div>
  );
}
