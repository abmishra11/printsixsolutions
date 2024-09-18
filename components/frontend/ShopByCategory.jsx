import Image from "next/image";
import React from "react";

export default function ShopByCategory({ categories }) {
  return (
    <div className="container pb-16">
      <h2 className="text-3xl font-medium text-primary uppercase mb-6">
        Shop By Category
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => {
          return (
            <div
              className="relative rounded-sm overflow-hidden group"
              key={category.id}
            >
              <Image
                src={category.imageUrl}
                alt={category.title}
                className="w-full h-48"
                width={100}
                height={100}
              />
              <a
                href={`/category/${category.slug}`}
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-primary font-roboto font-medium group-hover:bg-opacity-50 transition"
              >
                {category.title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
