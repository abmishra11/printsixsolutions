import React from "react";
import Sorting from "./Sorting";
import Filters from "./Filters";
import FilteredProducts from "./FilteredProducts";
import FilterBreadcrumb from "./FilterBreadcrumb";

export default function FilterComponent({ category, products }) {
  const { title, slug } = category;
  const productCount = category.products.length;

  return (
    <div className="container">
      <div className="text-primary py-4 space-y-6">
        <FilterBreadcrumb title={title} resultCount={productCount} />
      </div>
      <div className="grid grid-cols-4 gap-6 pt-4 pb-16 items-start">
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
          <Filters slug={slug} />
        </div>
        <div className="col-span-3">
          <Sorting title={title} isSearch={category?.isSearch} slug={slug} />
          <FilteredProducts productCount={productCount} products={products} />
        </div>
      </div>
    </div>
  );
}
