"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchResultsCount({ title, resultCount }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const pageSize = 1;
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, resultCount);
  return (
    <div  className="ml-2">
      <p>
        <span className="text-primary">{title}: </span> 
        <span className="text-white">Showing {startRange}-{endRange} of {resultCount} results</span>
      </p>
    </div>
  );
}
