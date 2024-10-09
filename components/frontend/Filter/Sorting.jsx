"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Sorting({ title, slug, isSearch }) {
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
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-primary hidden md:block">
          {isSearch && "Search Result - " + title}
        </h2>
        <div className="flex items-center gap-1 md:text-sm text-xs">
          {sortingLinks.map((link, i) => {
            return (
              <Link
                key={i}
                href={link.href}
                className={`${
                  link.sort == sortParams
                    ? "bg-primary text-white border border-primary rounded-md p-2"
                    : "bg-white text-primary border border-primary rounded-md p-2"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
