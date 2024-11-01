import CustomDataTable from "@/components/backoffice/CustomDataTable";
import DashboardCharts from "@/components/backoffice/DashboardCharts";
import Heading from "@/components/backoffice/Heading";
import LargeCards from "@/components/backoffice/LargeCards";
import SmallCards from "@/components/backoffice/SmallCards";
import UserDashboard from "@/components/backoffice/UserDashboard";
import VendorDashboard from "@/components/backoffice/VendorDashboard";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const { user } = session;
  const role = user?.role;

  if (role === "VENDOR") {
    const sales = await getData("sales");
    const products = await getData("products");
    return <VendorDashboard sales={sales} products={products} />;
  }

  if (role === "USER") {
    return <UserDashboard user={user} />;
  }

  if (role === "ADMIN") {
    const sales = await getData("sales");
    const orders = await getData("orders");
    return (
      <div>
        <Heading title="Dashboard Overview" />
        {/* Large Cards */}
        <LargeCards sales={sales} />
        {/* Small Cards */}
        <SmallCards orders={orders} />
        {/* Charts */}
        <DashboardCharts sales={sales} orders={orders} />
        {/* Recent Orders Table */}

        <div className="hidden md:block">
          <h2 className="text-xl font-bold text-slate-50 py-4">
            Recent Orders
          </h2>
          <CustomDataTable data={orders} />
        </div>
      </div>
    );
  }
}
