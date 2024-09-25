"use client";
import React, { useState } from "react";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import { Filter } from "lucide-react";

export default function Filters({ slug }) {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div>
      <div className="md:hidden text-primary py-2 rounded">
        <button onClick={toggleFilters}>Filters</button>
      </div>
      <div
        className={`${
          filtersVisible ? "block" : "hidden"
        } md:flex flex-col space-y-5 py-4 px-4 divide-y divide-gray-200 bg-white mt-4 md:mt-0 shadow rounded overflow-hidden`}
      >
        {/* Category Filter */}
        <CategoryFilter />

        {/* Price Filter */}
        <PriceFilter slug={slug} />
      </div>
    </div>
  );
}
