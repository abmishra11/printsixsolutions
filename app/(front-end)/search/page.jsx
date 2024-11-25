import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ searchParams }) {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(
    (category) => category.products.length > 0
  );

  const {
    sort = "asc",
    min = 0,
    max = "",
    page = 1,
    search = "",
  } = searchParams;

  const products = await getData(
    `products?search=${search}&page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  const filterData = {
    title: `Search Result for ${search}`,
    products: products?.products,
    productsCount: products?.productsCount,
    totalPages: products?.totalPages,
    pageUrl: `/search`,
    search,
  };

  return (
    <div>
      <FilterComponent filterData={filterData} categories={categories} />
    </div>
  );
}
