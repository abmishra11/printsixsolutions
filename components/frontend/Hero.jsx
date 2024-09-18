"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import { CircleDollarSign, FolderSync, HelpCircle } from "lucide-react";
import SidebarCategories from "./SidebarCategories";

export default function Hero({ categories }) {
  return (
    <div className="container grid grid-cols-12 gap-8 mb-6">
      <div className="sm:col-span-3 sm:block hidden bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden">
        <SidebarCategories categories={categories} />
      </div>
      <div className="col-span-full sm:col-span-7 bg-blue-600 rounded-md">
        <HeroCarousel />
      </div>
      <div className="col-span-2 hidden sm:block bg-white p-3 dark:bg-slate-800 rounded-lg">
        <Link href={"#"} className="flex items-center space-x-1 mb-3">
          <HelpCircle className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Help Center</h2>
            <p className="text-[0.6rem]">Guide to Customer Care</p>
          </div>
        </Link>
        <Link href={"#"} className="flex items-center space-x-1 mb-3">
          <FolderSync className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Easy Return</h2>
            <p className="text-[0.6rem]">Quick Return</p>
          </div>
        </Link>
        <Link href={"#"} className="flex items-center space-x-1 mb-6">
          <CircleDollarSign className="shrink-0 w-5 h-5 dark:text-lime-500 text-slate-900" />
          <div className="flex flex-col">
            <h2 className="uppercase text-sm">Sell on Limi</h2>
            <p className="text-[0.6rem]">Million of Visitors</p>
          </div>
        </Link>
        {/* <Image src={""} alt="" className="w-full rounded-lg" /> */}
      </div>
    </div>
  );
}
