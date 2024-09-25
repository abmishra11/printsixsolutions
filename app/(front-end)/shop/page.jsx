import React from "react";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import FilteredProducts from "@/components/frontend/Filter/FilteredProducts";
import Filters from "@/components/frontend/Filter/Filters";
import Sorting from "@/components/frontend/Filter/Sorting";
import { getData } from "@/lib/getData";

export default async function page() {
  const slug = "";
  const categories = await getData(`categories`);
  const products = await getData(`products`);
  const productCount = products.length;

  return (
    <div className="container">
      <div className="text-primary py-4 space-y-6">
        <Breadcrumb />
      </div>
      <div className="grid grid-cols-4 gap-6 pb-16 items-start">
        <div className="md:col-span-1 col-span-4">
          <Filters slug={slug} categories={categories} />
        </div>
        <div className="md:col-span-3 col-span-4">
          <Sorting title={"Shop"} isSearch={false} slug={""} />
          <FilteredProducts productCount={productCount} products={products} />
        </div>
      </div>
    </div>
  );
}
