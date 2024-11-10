"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CategoryFilter({ categories }) {
  const [urlLoaded, setUrlLoaded] = useState(false);
  useEffect(() => {
    setUrlLoaded(true)
  }, [])

  // const router = useRouter();

  // if(urlLoaded){
  //   const { slug } = router.query;
  //   console.log("slug: ", slug);
  // }
  
  
  return (
    <div>
      <h3 className="text-xl text-gray-800 mb-3 font-medium">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => {

          const isSelected = false

          return (
            <div className="flex items-center" key={category.slug}>
              {/* <input
                type="checkbox"
                id="cat-1"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              /> */}
              <Link
                href={`/category/${category.slug}`}
                className={`cursor-pointer ml-2 ${
                  isSelected ? "text-primary font-semibold" : "text-gray-600"
                }`}
                onClick={() => handleCategoryClick(category.slug)} // Update selected category on click
                aria-label={`Filter by ${category.title} category`}
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
