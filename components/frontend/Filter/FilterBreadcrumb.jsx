"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FilterBreadcrumb({ title, resultCount }) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const pageSize = 1;
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, resultCount);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-primary text-base">
          Home
        </Link>
        <span className="text-sm text-gray-400">
          <ChevronRight className="w-5 h-5" />
        </span>
        <p className="text-white font-medium">{title}</p>
      </div>
      <p>
        {startRange}-{endRange} of {resultCount} results
      </p>
    </div>
  );
}
