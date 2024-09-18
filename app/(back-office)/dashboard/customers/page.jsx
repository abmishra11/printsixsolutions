import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import DataTable from "@/components/datatable/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";

export default async function page() {
  const customers = await getData("customers");
  console.log("Customers Data", customers);

  return (
    <div>
      {/* Header */}
      {/* <PageHeader
        heading={"Vendors"}
        linkTitle={"Add Vendor"}
        href={"/dashboard/vendors/new"}
      /> */}
      {/* Table */}
      <div className="py-8">
        <DataTable
          data={customers}
          columns={columns}
          filterKeys={["name", "email"]}
        />
      </div>
    </div>
  );
}
