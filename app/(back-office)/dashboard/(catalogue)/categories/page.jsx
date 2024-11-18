import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const categories = await getData("categories");

  const categoryDict = {};
  categories.forEach((category) => {
    categoryDict[category.id] = category.title;
  });

  // Add parent category name to each category
  const updatedCategories = categories.map((category) => {
    const parentTitle = category.parentId
      ? categoryDict[category.parentId]
      : "No Parent Category";
    return { ...category, parentTitle };
  });

  // Sort updatedCategories by createdAt date (newest first)
  updatedCategories.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <PageHeader
        heading={"Categories"}
        linkTitle={"Add Category"}
        href={"/dashboard/categories/new"}
      />

      {/* Table */}
      <DataTable data={updatedCategories} columns={columns} />
    </div>
  );
}
