import { getData } from "@/lib/getData";
import Link from "next/link";
import React from "react";

export default async function CategoryFilter() {
  const categories = await getData("categories");
  console.log("Fileter categories: ", categories);

  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 font-medium">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => {
          return (
            <div className="flex items-center" key={category.slug}>
              <input
                type="checkbox"
                id="cat-1"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <Link
                href={`/category/${category.slug}`}
                className="text-gray-600 ml-3 cursor-pointer"
              >
                {category.title}
              </Link>
              <div className="ml-auto text-gray-600 text-sm">
                ({category.products.length})
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
