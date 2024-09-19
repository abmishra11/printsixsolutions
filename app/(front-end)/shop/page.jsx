import Breadcrumb from "@/components/frontend/Breadcrumb";
import FilteredProducts from "@/components/frontend/Filter/FilteredProducts";
import Filters from "@/components/frontend/Filter/Filters";
import Sorting from "@/components/frontend/Filter/Sorting";
import { getData } from "@/lib/getData";
import React from "react";

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
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
          <Filters slug={slug} categories={categories} />
        </div>
        <div className="col-span-3">
          <Sorting title={"Shop"} isSearch={false} slug={""} />
          <FilteredProducts productCount={productCount} products={products} />
        </div>
      </div>
    </div>
  );
}
