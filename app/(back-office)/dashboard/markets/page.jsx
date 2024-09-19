import Heading from "@/components/backoffice/Heading";
import PageHeader from "@/components/backoffice/PageHeader";
import TableActions from "@/components/backoffice/TableActions";
import React from "react";

export default function page() {
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading={"Markets"}
        linkTitle={"Add Market"}
        href={"/dashboard/markets/new"}
      />
      {/* Table Actions */}
      {/* Export || Search || Bulk Delete */}
      <TableActions />
      {/* Table */}
      <div className="py-8">
        <h2>Table</h2>
      </div>
    </div>
  );
}
