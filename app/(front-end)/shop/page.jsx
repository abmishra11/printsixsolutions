import React from "react";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import FilteredProducts from "@/components/frontend/Filter/FilteredProducts";
import Filters from "@/components/frontend/Filter/Filters";
import Sorting from "@/components/frontend/Filter/Sorting";
import { getData } from "@/lib/getData";
import FilterComponent from "@/components/frontend/Filter/FilterComponent";

export default async function page({ searchParams }) {
  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;
  const categories = await getData(`categories`);
  const products = await getData(
    `products?page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  const filterData = {
    title: "Shop",
    products,
    pageUrl: `/shop`,
  };

  return (
    <div>
      <FilterComponent filterData={filterData} categories={categories} />
    </div>
  );
}
