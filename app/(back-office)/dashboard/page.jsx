import CustomDataTable from "@/components/backoffice/CustomDataTable";
import DashboardCharts from "@/components/backoffice/DashboardCharts";
import Heading from "@/components/backoffice/Heading";
import LargeCards from "@/components/backoffice/LargeCards";
import SmallCard from "@/components/backoffice/SmallCard";
import SmallCards from "@/components/backoffice/SmallCards";
import UserDashboard from "@/components/backoffice/UserDashboard";
import VendorDashboard from "@/components/backoffice/VendorDashboard";
import { authOptions } from "@/lib/authOptions";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import React from "react";

export default async function page() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const sales = await getData("sales");

  const orders = await getData("orders");

  const products = await getData("products");

  if (role === "VENDOR") {
    return <VendorDashboard sales={sales} products={products} />;
  }

  if (role === "USER") {
    return <UserDashboard />;
  }

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
      <CustomDataTable data={orders} />
    </div>
  );
}
