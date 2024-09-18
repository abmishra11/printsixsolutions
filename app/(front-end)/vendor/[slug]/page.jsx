import CategoryList from "@/components/frontend/CategoryList";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Page({ params: { slug } }) {
  const categoriesData = await getData("categories");
  const categories = categoriesData.filter((category) => {
    return category.products.length > 2;
  });
  return (
    <div className="grid grid-cols-12 gap-6 py-8 w-full">
      <div className="sm:col-span-2 sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden hidden p-4 text-slate-800 dark:text-slate-200">
        <div className="">
          <div className="flex items-center justify-center">
            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt=""
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <h2 className="py-4 text-sm text-center">Print Six Solutions</h2>
          <p className="text-sm line-clamp-2 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi
            praesentium iure commodi nulla culpa exercitationem dignissimos
            deserunt pariatur? Iure eos rem dignissimos repellendus beatae
            nostrum architecto voluptate tempore sapiente aliquam!
          </p>
        </div>
        <div className="text-sm flex flex-col">
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
          <Link href={"#"} className="py-2">
            Category 1
          </Link>
        </div>
      </div>
      <div className="col-span-full sm:col-span-10 rounded-md">
        {categories.map((category, i) => {
          return (
            <div className="" key={i}>
              <CategoryList category={category} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
