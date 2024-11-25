"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import SearchResultsCount from "./SearchResultsCount";

export default function Sorting({ title, pageUrl, productsCount }) {
  const searchParams = useSearchParams();
  const sortParams = searchParams.get("sort");
  const search = searchParams.get("search");
  const generateHref = (baseHref, sort, search) => {
    const url = new URL(baseHref, process.env.NEXT_PUBLIC_BASE_URL);
    if (sort) {
      url.searchParams.set("sort", sort);
    }
    if (search) {
      url.searchParams.set("search", search);
    }
    return url.pathname + url.search;
  };

  const sortingLinks = [
    {
      title: "Relevance",
      href: generateHref(pageUrl, "", search),
      sort: null,
    },
    {
      title: "Price High to Low",
      href: generateHref(pageUrl, "desc", search),
      sort: "desc",
    },
    {
      title: "Price Low to High",
      href: generateHref(pageUrl, "asc", search),
      sort: "asc",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      {/* Title Section on the Left */}
      <h2 className="text-primary hidden md:block w-auto">
        <SearchResultsCount title={title} resultsCount={productsCount} />
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
