import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const banners = await getData("banners");
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading={"Banners"}
        linkTitle={"Add Banner"}
        href={"/dashboard/banners/new"}
      />

      {/* Table */}
      <div className="py-8">
        <DataTable data={banners} columns={columns} />
      </div>
    </div>
  );
}
