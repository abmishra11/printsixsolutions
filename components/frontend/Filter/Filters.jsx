"use client";
import React, { useState } from "react";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import { Filter } from "lucide-react";

export default function Filters({ pageUrl, categories, search }) {
  
  let lastSlug = pageUrl.replace(/\/$/, '').split('/').pop();

  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div>
      <div className="md:hidden">
        <button
          onClick={toggleFilters}
          className="p-2 border border-primary rounded-md bg-primary text-white text-xs"
        >
          {filtersVisible ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      <div
        className={`${
          filtersVisible ? "block" : "hidden"
        } md:flex flex-col space-y-5 py-4 px-4 divide-y divide-gray-200 bg-white mt-4 md:mt-0 shadow rounded overflow-hidden`}
      >
        {/* Category Filter */}
        <CategoryFilter categories={categories} slug={lastSlug} />

        {/* Price Filter */}
        <PriceFilter pageUrl={pageUrl} search={search} />
      </div>
    </div>
  );
}
