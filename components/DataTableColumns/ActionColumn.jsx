import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import DeleteButton from "../actions/DeleteButton";
import EditButton from "../actions/EditButton";
import Link from "next/link";
import StatusChangeButton from "../actions/StatusChangeButton";

export default function ActionColumn({
  row,
  title,
  status = false,
  viewEndPoint = "",
  statusChangeEndPoint = "",
  deleteEndPoint = "",
  editEndPoint = "",
}) {
  const isActive = row.isActive;
  console.log(viewEndPoint);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {viewEndPoint !== "" && (
          <DropdownMenuItem>
            <Link href={viewEndPoint}>View {title}</Link>
          </DropdownMenuItem>
        )}
        {statusChangeEndPoint !== "" && (
          <DropdownMenuItem>
            <StatusChangeButton
              title={title}
              status={status}
              statusChangeEndPoint={statusChangeEndPoint}
            />
          </DropdownMenuItem>
        )}
        {deleteEndPoint !== "" && (
          <DropdownMenuItem>
            <DeleteButton title={title} deleteEndPoint={deleteEndPoint} />
          </DropdownMenuItem>
        )}
        {editEndPoint !== "" && (
          <DropdownMenuItem>
            <EditButton title={title} editEndPoint={editEndPoint} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
