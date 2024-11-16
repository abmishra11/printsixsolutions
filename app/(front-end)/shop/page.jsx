import React from "react";
import { getData } from "@/lib/getData";
import FilterComponent from "@/components/frontend/Filter/FilterComponent";

export default async function page({ searchParams }) {
  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;
  const products = await getData(
    `products?page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  const filterData = {
    title: "Shop",
    products,
    pageUrl: `/shop`,
    search: "",
  };

  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(
    (category) => category.products.length > 0
  );

  return (
    <div>
      <FilterComponent filterData={filterData} categories={categories} />
    </div>
  );
}
