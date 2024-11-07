import FilterComponent from "@/components/frontend/Filter/FilterComponent";
import { getData } from "@/lib/getData";
import React from "react";

export default async function page({ searchParams }) {

  const categories = await getData("categories");

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
    products,
    pageUrl: `/search?search=${search}`,
  };

  return (
    <div>
      <FilterComponent filterData={filterData} categories={categories} />
    </div>
  );
}
