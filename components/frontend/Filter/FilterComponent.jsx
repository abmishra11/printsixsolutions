import React from "react";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";
import FilterBreadcrumb from "./FilterBreadcrumb";
import SearchResultsCount from "./SearchResultsCount";

export default function FilterComponent({ category, products, categories }) {
  const { title, slug } = category;
  const productCount = products.length;

  return (
    <div className="container">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 space-y-6 md:space-y-0">
        <FilterBreadcrumb title={title} resultCount={productCount} />
        <SearchResultsCount resultCount={productCount} />
        <Sorting title={title} isSearch={category?.isSearch} slug={slug} />
      </div>
      <div className="grid grid-cols-4 gap-6 pb-16 items-start">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
          <Filters slug={slug} categories={categories} />
        </div>
        <div className="col-span-3">
          <FilteredProducts productCount={productCount} products={products} />
        </div>
      </div>
    </div>
  );
}
