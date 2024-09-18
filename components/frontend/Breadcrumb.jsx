"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  const pathName = usePathname();
  const pathArr = pathName.split("/");
  pathArr.shift();
  console.log(pathArr);
  return (
    <nav className="flex my-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-primary">
            Home
          </Link>
        </li>
        {pathArr.map((item, i) => {
          return (
            <li key={i}>
              <div className="flex items-center capitalize">
                <ChevronRight className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" />
                <span className="ms-1 text-white hover:text-primary md:ms-2">
                  {item}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
