"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import SearchResultsCount from "./SearchResultsCount";

export default function Sorting({ title, slug, isSearch, productCount='' }) {
  const searchParams = useSearchParams();
  const sortParams = searchParams.get("sort");
  const sortingLinks = [
    {
      title: "Relevance",
      href: `/category/${slug}`,
      sort: null,
    },
    {
      title: "Price High to Low",
      href: `/category/${slug}?sort=desc`,
      sort: "desc",
    },
    {
      title: "Price Low to High",
      href: `/category/${slug}?sort=asc`,
      sort: "asc",
    },
  ];
  return (
      <div className="flex items-center justify-between w-full">
        {/* Title Section on the Left */}
        <h2 className="text-sm font-medium text-primary hidden md:block w-auto">
          {isSearch && `Search Result - ${title}`}
          {(!isSearch && productCount) && <SearchResultsCount resultCount={productCount} />}
        </h2>

        {/* Sorting Links Section on the Right */}
        <div className="flex items-center gap-1 md:text-sm text-xs w-auto">
          {sortingLinks && sortingLinks.length > 0 ? (
            sortingLinks.map((link, i) => {
              const isActive = link.sort === sortParams;
              const linkStyles = isActive
                ? "bg-primary text-white border border-primary rounded-md p-2 transition-colors duration-200"
                : "bg-white text-primary border border-primary rounded-md p-2 transition-colors duration-200";

              return (
                <Link
                  key={i}
                  href={link.href}
                  aria-label={`Sort by ${link.title}`}
                  role="button"
                  className={linkStyles}
                >
                  {link.title}
                </Link>
              );
            })
          ) : (
            <p className="text-gray-500">No sorting options available</p>
          )}
        </div>
      </div>

  );
}
