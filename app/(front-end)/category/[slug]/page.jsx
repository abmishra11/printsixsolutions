import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { slug }, searchParams }) {
  const categories = await getData("categories");
  const filteredCategories = categories.filter(
    (category) => category.products && category.products.length > 0
  );
  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;
  const category = await getData(`categories/filter/${slug}`);

  const products = await getData(
    `products?catId=${category.id}&page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  const filterData = {
    title: category?.title,
    products,
    pageUrl: `/category/${slug}`,
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
