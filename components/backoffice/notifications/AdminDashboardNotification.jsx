import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlignJustify,
  Bell,
  LayoutDashboard,
  LogOut,
  Settings,
  Sun,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { getFormattedDateAndTime } from "@/lib/getFormatedDateAndTime";
import { getData } from "@/lib/getData";

export default function AdminDashboardNotification({ outOfStockProducts }) {
  const outOfStockCount = outOfStockProducts.length;
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
          >
            <Bell className="text-lime-700 dark:text-lime-500" />
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full -top-0 -end-1 dark:border-gray-900">
              {outOfStockCount}
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="py-2 px-4 pr-8">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {outOfStockProducts.map((product) => {
            let updatedDate = getFormattedDateAndTime(product.updatedAt);
            return (
              <>
                <DropdownMenuItem key={`${product.id}`}>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={`${product.imageUrl}`}
                      alt={`${product.title}`}
                      width={200}
                      height={200}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <p>{`${product.title}`}</p>
                      <div className="flex items-center space-x-2">
                        <p className="px-3 py-0.5 bg-red-700 text-white rounded-full text-sm">
                          Stock Out
                        </p>
                        <p>{`${updatedDate}`}</p>
                      </div>
                      <span>
                        <X />
                      </span>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator key={`${product.id}`} />
              </>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
