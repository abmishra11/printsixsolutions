import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ params: { slug }, searchParams }) {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter(
    (category) => category.products.length > 0
  );

  const category = categoriesData.filter(
    (categoryData) => categoryData.slug === slug
  );

  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;

  const { products, productsCount, totalPages } = await getData(
    `products?catId=${category[0]?.id}&page=${page}&sort=${sort}&min=${min}&max=${max}`
  );

  const filterData = {
    title: category[0].title,
    products,
    productsCount,
    totalPages,
    pageUrl: `/category/${slug}`,
    search: "",
  };

  return (
    <div>
      <FilterComponent filterData={filterData} categories={categories} />
    </div>
  );
}
