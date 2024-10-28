"use client";
import React from "react";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { generateinitials } from "@/lib/generateinitials";
import { useHandleLogout } from "@/lib/handleLogout"; // Import the hook

export default function UserAvatar({ user = {} }) {
  const { name, image, role } = user;
  let initials;
  if(name){
    initials = generateinitials(name);
  }
  
  const handleLogout = useHandleLogout(); // Use the hook

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div>
            {image ? (
              <Image
                src="/photo.jpg"
                alt="User Profile"
                width={200}
                height={200}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 p-4 flex items-center justify-center rounded-full bg-primary shadow-md border border-primary">
                {initials}
              </div>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="py-2 px-4 pr-8">
          <DropdownMenuLabel>{name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={"/dashboard"} className="flex items-center space-x-2">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Link
              href={"dashboard/profile"}
              className="flex items-center space-x-2"
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem> */}
          {role === "USER" && (
            <DropdownMenuItem>
              <Link
                href={"/dashboard/customer/orders"}
                className="flex items-center space-x-2"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>My Orders</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <button
              className="flex items-center space-x-2"
              onClick={handleLogout} // Use the handleLogout function
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
