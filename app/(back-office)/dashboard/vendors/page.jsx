import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const vendors = await getData("vendors");
  const filterKeys = [{ name: "Name" }, { email: "Email" }];
  const tableName = "Vendors";
  const exportColumns = [{ name: "Name" }, { email: "Email" }];
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <PageHeader
        heading={"Vendors"}
        linkTitle={"Add Vendor"}
        href={"/dashboard/vendors/new"}
      />
      {/* Table */}
      <DataTable
        tableName={tableName}
        data={vendors}
        columns={columns}
        filterKeys={filterKeys}
        exportColumns={exportColumns}
      />
    </div>
  );
}
