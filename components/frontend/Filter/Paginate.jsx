"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

export default function Paginate({ totalPages }) {
  const searchParams = useSearchParams();
  const { sort = "asc", min = 0, max = "", page = 1 } = searchParams;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const createPageLink = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    return `?${params.toString()}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              href={createPageLink(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // First, current, last with ellipses
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={1 === currentPage} href={createPageLink(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (currentPage > 3) {
        pages.push(<PaginationEllipsis key="start-ellipsis" />);
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              href={createPageLink(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (currentPage < totalPages - 2) {
        pages.push(<PaginationEllipsis key="end-ellipsis" />);
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={totalPages === currentPage}
            href={createPageLink(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageLink(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href={createPageLink(Math.min(totalPages, currentPage + 1))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
