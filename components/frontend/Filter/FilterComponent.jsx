import React from "react";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";
import FilterBreadcrumb from "./FilterBreadcrumb";

export default async function FilterComponent({ filterData, categories }) {
  const { title, products, productsCount, totalPages, pageUrl, search } =
    filterData;

  return (
    <div className="container">
      <div className="grid md:grid-cols-4 grid-cols-1 py-4 space-y-6 md:space-y-0">
        <div className="md:col-span-1 col-span-1 flex items-center">
          <FilterBreadcrumb title={title} />
        </div>
        <div className="md:col-span-3 col-span-1">
          <Sorting
            title={title}
            pageUrl={pageUrl}
            productsCount={productsCount}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-4 grid-cols-1 gap-6 pb-16 items-start">
        <div className="col-span-1 md:sticky md:top-1 md:left-0">
          <Filters pageUrl={pageUrl} categories={categories} search={search} />
        </div>
        <div className="md:col-span-3 col-span-1">
          <FilteredProducts totalPages={totalPages} products={products} />
        </div>
      </div>
    </div>
  );
}
