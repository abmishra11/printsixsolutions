import * as React from "react";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";

export default async function Filters({ slug }) {
  return (
    <div className="divide-y divide-gray-200 space-y-5 py-4">
      <CategoryFilter />
      <PriceFilter slug={slug} />
      {/* <BrandFilter /> */}
    </div>
  );
}
