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

  updatedCategories.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filterKeys = [{ title: "Title" }, { description: "Description" }];
  const tableName = "Categories";
  const exportColumns = [
    { title: "Title" },
    { imageUrl: "Image URL" },
    { description: "Description" },
    { isActive: "Status" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <PageHeader
        heading={"Categories"}
        linkTitle={"Add Category"}
        href={"/dashboard/categories/new"}
      />
      {/* Table */}
      <DataTable
        tableName={tableName}
        data={updatedCategories}
        columns={columns}
        filterKeys={filterKeys}
        exportColumns={exportColumns}
      />
    </div>
  );
}
