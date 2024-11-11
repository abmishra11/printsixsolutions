import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ShopByCategory({ categories }) {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-primary uppercase mb-6">
        Shop By Category
      </h2>
      <div class="grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1">
        {categories.map((category) => {
          return (
            <div
              class="flex-shrink-0 mb-8 relative overflow-hidden bg-primary rounded-lg max-w-xs shadow-lg group"
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
                <Link
                  href={`/category/${category.slug}`}
                  className=""
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.title}
                    className="w-full h-48"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <div class="relative text-white px-6 pb-6 mt-6 py-4">
                <div class="flex justify-between">
                  <Link
                    href={`/category/${category.slug}`}
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-roboto group-hover:bg-opacity-50 transition font-semibold text-xl"
                  >
                    {category.title}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
