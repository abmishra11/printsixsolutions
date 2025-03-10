import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";
import OverviewCards from "./vendor/OverviewCards";

export default async function VendorDashboard({ sales, products }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { name, email, id, role, emailVerified, status = false } = user;
  const salesById = sales.filter((sale) => sale.vendorId === id);
  const productsById = products.filter((product) => product.userId === id);
  if (!status) {
    return (
      <div className="max-w-2xl max-auto min-h-screen mt-8">
        <div
          className="p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
          id="alert-additional-content-1"
        >
          <div className="flex items-center">
            <info className="flex-shrink-0 w-4 h-4 me-2" />
            <span className="sr-only">Info</span>
            <h3 className="text-lg font-medium">Account Under Review</h3>
          </div>
          <div className="mt-2 mb-4 text-sm">
            Your account details are currently under review. Please note that it
            may take 24-48 hours for approval. Thank you for your patience.
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <OverviewCards sales={salesById} products={productsById} />
        </div>
      </div>
    );
  }
}
