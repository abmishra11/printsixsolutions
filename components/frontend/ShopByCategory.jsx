import Image from "next/image";
import React from "react";

export default function ShopByCategory({ categories }) {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-primary uppercase mb-6">
        Shop By Category
      </h2>
      <div class="p-1 flex flex-wrap items-center justify-center">
        {categories.map((category) => {
          return (
            <div
              class="flex-shrink-0 m-6 relative overflow-hidden bg-primary rounded-lg max-w-xs shadow-lg group"
              key={category?.id}
            >
              <div class="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div
                  class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: "0.2",
                  }}
                ></div>
                <Image
                  src={category.imageUrl}
                  alt={category.title}
                  className="w-full h-48"
                  width={100}
                  height={100}
                />
              </div>
              <div class="relative text-white px-6 pb-6 mt-6 py-4">
                <div class="flex justify-between">
                  <a
                    href={`/category/${category.slug}`}
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-roboto group-hover:bg-opacity-50 transition font-semibold text-xl"
                  >
                   
                      {category.title}
                    
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
