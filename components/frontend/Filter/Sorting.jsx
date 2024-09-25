"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Sorting({ title, slug, isSearch }) {
  const [sortingVisible, setSortingVisible] = useState(false);

  const toggleSorting = () => {
    setSortingVisible(!sortingVisible);
  };

  const searchParams = useSearchParams();
  const sortParams = searchParams.get("sort");
  const sortingLinks = [
    {
      title: "Relevance",
      href: `/category/${slug}`,
      sort: null,
    },
    {
      title: "Price - High to Low",
      href: `/category/${slug}?sort=desc`,
      sort: "desc",
    },
    {
      title: "Price - Low to High",
      href: `/category/${slug}?sort=asc`,
      sort: "asc",
    },
  ];
  return (
    <div>
      <div className="md:hidden text-primary py-2 rounded">
        <button onClick={toggleSorting}>Filters</button>
      </div>
      <div
        className={`${
          sortingVisible ? "block" : "hidden"
        } flex items-center justify-between`}
      >
        <h2 className="text-xl font-medium text-primary hidden md:block">
          {isSearch && "Search Result - "}
          {title}
        </h2>
        <div className="flex text-sm items-center gap-3 mb-4">
          <div className="flex items-center gap-1">
            {sortingLinks.map((link, i) => {
              return (
                <Link
                  key={i}
                  href={link.href}
                  className={`${
                    link.sort == sortParams
                      ? "bg-slate-800 text-primary border border-primary px-4 py-3"
                      : "bg-white text-primary border border-primary px-4 py-3"
                  }`}
                >
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
