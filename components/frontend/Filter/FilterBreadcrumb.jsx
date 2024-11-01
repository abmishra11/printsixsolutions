"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FilterBreadcrumb({ title, resultCount }) {
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
    </div>
  );
}
