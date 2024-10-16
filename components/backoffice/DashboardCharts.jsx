import React from "react";
import WeeklySalesChart from "./WeeklySalesChart";
import BestSellingProductChart from "./BestSellingProductChart";

export default function DashboardCharts({ sales, orders }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <WeeklySalesChart salesData={sales} ordersData={orders} />
      <BestSellingProductChart />
    </div>
  );
}
