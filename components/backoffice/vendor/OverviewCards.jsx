import React from "react";

export default function OverviewCards({ sales, products }) {
  const productsCount = products.length.toString().padStart(2, "0");
  const salesCount = sales.length.toString().padStart(2, "0");
  const totalSales = sales.reduce((acc, item) => acc + item.total, 0);
  const analytics = [
    {
      title: "Products",
      count: productsCount,
      unit: "",
      link: "dashboard/products",
      icon: "",
    },
    {
      title: "Sales",
      count: salesCount,
      unit: "",
      link: "dashboard/sales",
      icon: "",
    },
    {
      title: "Total Revenue",
      count: totalSales,
      unit: "",
      link: "dashboard/sales",
      icon: "",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      OverviewCards
    </div>
  );
}
