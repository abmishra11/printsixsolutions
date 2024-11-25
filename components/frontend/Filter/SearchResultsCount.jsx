"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchResultsCount({ title, resultsCount }) {
  console.log("resultsCount: ", resultsCount);

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const pageSize = 12;
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, resultsCount);
  return (
    <div className="ml-2">
      <p>
        <span className="text-primary">{title}: </span>
        <span className="text-white">
          Showing {startRange}-{endRange} of {resultsCount} results
        </span>
      </p>
    </div>
  );
}
