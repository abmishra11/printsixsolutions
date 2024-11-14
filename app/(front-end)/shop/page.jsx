import React from "react";
import { getData } from "@/lib/getData";
import FilterComponent from "@/components/frontend/Filter/FilterComponent";

export default async function page({ searchParams }) {
  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;
  const categories = await getData(`categories`);
  const filteredCategories = categories.filter(
    (category) => category.products && category.products.length > 0
  );

  const products = await getData(
    `products?page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  const filterData = {
    title: "Shop",
    products,
    pageUrl: `/shop`,
    search: "",
  };

  return (
    <div>
      <FilterComponent
        filterData={filterData}
        categories={filteredCategories}
      />
    </div>
  );
}
