"use client";
import React, { useEffect, useState } from "react";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import SearchForm from "./SearchForm";
import { Menu, MenuIcon, SearchIcon, User, X } from "lucide-react";
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
import Spinner from "../spinners/Spinner";
export default function Navbar({ categories }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    <Spinner />;
  }

  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="p-4 bg-gray-800"></div>
      <header className="shadow-sm bg-white">
        <Link
          className=" py-2 flex justify-center items-center mb-3 md:hidden"
          href="/"
        >
          <Image src={logo} alt="PrintSix logo" width={150} className="mr-2" />
        </Link>
        <div className="container flex items-center justify-center gap-12">
          {/* Logo */}
          <Link className="py-2 hidden md:block" href="/">
            <Image
              src={logo}
              alt="PrintSix logo"
              height={100}
              className="mr-2"
            />
          </Link>
          {/* SEARCH */}
          <div className="w-full lg:max-w-2xl md:max-w-xl sm:max-w-2xl hidden sm:block mr-4">
            <SearchForm />
          </div>

          {/* 3 ICONS */}
          <div className="flex items-center justify-center space-x-4 md:mb-0 mb-4">
            <HelpModal />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <CartCount />
              </DropdownMenuTrigger>
            </DropdownMenu>
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
            {/* <ThemeSwitcherBtn /> */}
            <button className="block md:hidden" onClick={toggleSearch}>
              <SearchIcon className="text-primary" />
            </button>
          </div>
        </div>
        <div
          className={`container flex-1 mt-4 md:mt-0 ${
            isSearchVisible ? "block" : "hidden"
          } md:hidden`}
        >
          <SearchForm />
        </div>
      </header>
      <nav className="bg-gray-800">
        <div className="container mx-auto px-4 md:px-8 relative">
          {/* Hamburger Icon for Mobile */}
          <div
            className="px-4 py-4 cursor-pointer flex items-center justify-center md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <MenuIcon />
          </div>

          {/* Navigation Wrapper */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center`}
          >
            {/* All Categories Button */}
            <div className="relative group">
              <div className="px-4 bg-primary py-4 cursor-pointer text-center">
                <span className="capitalize text-white">All Categories</span>
              </div>

              {/* Full-width Mega Menu */}
              <div className="absolute left-0 top-full md:w-[1300px] bg-white shadow-md py-4 opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible z-50">
                <div className="container px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <div className="items-center text-center">
                        <Image
                          src={category.imageUrl}
                          width={200}
                          height={200}
                          alt={category.title}
                          className="w-full h-24 object-contain"
                        />
                        <span className="mt-8 text-primary">
                          {category.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex flex-col md:flex-row items-center justify-between pl-4 space-y-4 md:space-y-0 md:space-x-4 header-menu">
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition p-4"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-200 hover:text-white transition p-4"
              >
                Shop
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-white transition p-4"
              >
                About
              </Link>
              <Link
                href="#"
                className="text-gray-200 hover:text-white transition p-4"
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
