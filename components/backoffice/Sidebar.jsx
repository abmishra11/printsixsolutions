"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.png";
import {
  Boxes,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  HeartHandshake,
  LayoutGrid,
  LayoutList,
  ScanSearch,
  Truck,
  User2,
  UserSquare2,
  Warehouse,
  BookImage,
  Star,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Sidebar({ showSideBar }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(false);

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  let sidebarLinks = [
    {
      title: "Customers",
      icon: User2,
      href: "/dashboard/customers",
    },
    // {
    //   title: "Markets",
    //   icon: Warehouse,
    //   href: "/dashboard/markets",
    // },
    {
      title: "Vendors",
      icon: UserSquare2,
      href: "/dashboard/vendors",
    },
    {
      title: "Orders",
      icon: Truck,
      href: "/dashboard/orders",
    },
    {
      title: "Sales",
      icon: Truck,
      href: "/dashboard/sales",
    },
    {
      title: "Reviews",
      icon: Star,
      href: "/dashboard/reviews",
    },
    // {
    //   title: "Staff",
    //   icon: User,
    //   href: "/dashboard/staff",
    // },
    // {
    //   title: "Settings",
    //   icon: LayoutGrid,
    //   href: "/dashboard/settings",
    // },
    {
      title: "Online Store",
      icon: ExternalLink,
      href: "/",
    },
  ];

  let catalogueLinks = [
    {
      title: "Categories",
      icon: LayoutList,
      href: "/dashboard/categories",
    },
    {
      title: "Products",
      icon: Boxes,
      href: "/dashboard/products",
    },
    // {
    //   title: "Coupons",
    //   icon: ScanSearch,
    //   href: "/dashboard/coupons",
    // },
    // {
    //   title: "Store Banners",
    //   icon: MonitorPlay,
    //   href: "/dashboard/banners",
    // },
  ];

  const role = session?.user?.role;

  if (role === "VENDOR") {
    catalogueLinks = [
      {
        title: "Products",
        icon: Boxes,
        href: "/dashboard/products",
      },
      {
        title: "Coupons",
        icon: ScanSearch,
        href: "/dashboard/coupons",
      },
    ];
    sidebarLinks = [
      {
        title: "Sales",
        icon: Truck,
        href: "/dashboard/sales",
      },
      {
        title: "Vendor Support",
        icon: HeartHandshake,
        href: "/dashboard/vendor-support",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
      // {
      //   title: "Settings",
      //   icon: ExternalLink,
      //   href: "/",
      // },
    ];
  }

  if (role === "USER") {
    sidebarLinks = [
      {
        title: "My Orders",
        icon: Truck,
        href: "/dashboard/customer/orders",
      },
      {
        title: "Address Book",
        icon: Truck,
        href: "/dashboard/customer/addresses",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];

    catalogueLinks = [];
  }

  return (
    <div
      className={
        showSideBar
          ? "sm:block mt-20 sm:mt-0 dark:bg-slate-800 bg-white space-y-6 w-64 text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll z-50 min-h-screen"
          : "hidden sm:block mt-20 sm:mt-0 dark:bg-slate-800 bg-white space-y-6 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll"
      }
    >
      <div className="flex flex-col items-center px-6 py-4">
        <Link href="/dashboard">
          <Image src={logo} alt="logo" className="w-full" />
        </Link>
      </div>
      <div className="flex flex-col">
        <Link
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "flex items-center space-x-3 px-6 py-4 border-l-8 border-lime-500 text-lime-500 text-2xl"
              : "flex items-center space-x-3 px-6 py-4 text-2xl"
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        {catalogueLinks.length > 0 && (
          <Collapsible className="px-6 py-4">
            <CollapsibleTrigger
              className=""
              onClick={() => setOpenMenu(!openMenu)}
            >
              <span className="flex items-center space-x-6 py-2 text-2xl">
                <div className="flex items-center space-x-3">
                  <BookImage />
                  <span>Catalogue</span>
                </div>
                {openMenu ? <ChevronDown /> : <ChevronRight />}
              </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-2 py-4 dark:bg-slate-800 dark:text-slate-300 rounded-lg text-xl">
              {catalogueLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    onClick={() => setShowSidebar(false)}
                    key={i}
                    href={item.href}
                    className={
                      item.href === pathname
                        ? "flex items-center space-x-3 px-6 py-4 text-lime-500"
                        : "flex items-center space-x-3 px-6 py-4"
                    }
                  >
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {sidebarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={() => setShowSidebar(false)}
              key={i}
              href={item.href}
              className={
                item.href === pathname
                  ? "flex items-center space-x-3 border-l-8 border-lime-500 text-lime-500 px-6 py-4 text-2xl"
                  : "flex items-center space-x-3 px-6 py-4 text-2xl"
              }
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
