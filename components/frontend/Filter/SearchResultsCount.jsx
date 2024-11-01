"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function SearchResultsCount({ resultCount }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const pageSize = 1;
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, resultCount);
  return (
    <div>
      <p>
        Showing {startRange}-{endRange} of {resultCount} results
      </p>
    </div>
  );
}
