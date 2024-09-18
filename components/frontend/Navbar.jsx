"use client";
import React from "react";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import SearchForm from "./SearchForm";
import { User, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HelpModal from "./HelpModal";
import CartCount from "./CartCount";
import { useSession } from "next-auth/react";
import UserAvatar from "../backoffice/UserAvatar";
export default function Navbar({ categories }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div>
      <div className="p-4 bg-gray-800"></div>
      <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link className="" href="/">
            <Image
              src={logo}
              alt="PrintSix logo"
              height={100}
              className="mr-2"
            />
          </Link>
          {/* SEARCH */}
          <SearchForm />
          {/* 3 ICONS */}
          <div className="flex items-center space-x-4">
            {status === "unauthenticated" ? (
              <Link
                href={"/login"}
                className="flex items-center space-x-1 text-primary"
              >
                <User />
                <span>Login</span>
              </Link>
            ) : (
              <UserAvatar user={session?.user} />
            )}
            <HelpModal />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CartCount />
              </DropdownMenuTrigger>
            </DropdownMenu>
            {/* <ThemeSwitcherBtn /> */}
          </div>
        </div>
      </header>
      <nav className="bg-gray-800">
        <div className="container flex">
          <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
            <span className="text-white">
              <i className="fas fa-bars"></i>
            </span>
            <span className="capitalize ml-2 text-white">All Categories</span>
            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                >
                  <Image
                    src={`${category.imageUrl}`}
                    width={50}
                    height={50}
                    alt={category.title}
                    className="w-5 h-5 object-contain"
                  />
                  <span className="ml-6 text-gray-600 text-sm">
                    {category.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-white transition"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
