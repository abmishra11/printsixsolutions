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
export default function Navbar({ categories }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { data: session, status } = useSession();

  // useEffect(()=>{
  //   if (status === "loading") {
  //    showLoader(true);
  //   }
  //   ()=>{
  //     showLoader(false);
  //   }
  // },[status])

  // const showLoader = (show)=>{
  //   if(show){
  //     return <p>Loading...</p>;
  //   }else{
  //     return null;
  //   }

  // }

  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  // State to track whether the mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle function to open/close the menu
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
        <div className="container md:{block}">
          {/* Hamburger Icon for Mobile */}
          <div
            className="px-8 py-4 cursor-pointer flex items-center justify-center md:hidden"
            onClick={toggleMenu}
          >
            <MenuIcon />
          </div>
          {/* Navigation Items */}
          <div className={`${isMenuOpen ? "block" : "hidden"} md:flex`}>
            <div className="px-8 bg-primary py-4 cursor-pointer relative group text-center">
              <span className="capitalize ml-2 text-white">All Categories</span>
              <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible z-50">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                    <Image
                      src={`${category.imageUrl}`}
                      width={100}
                      height={100}
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

            {/* Menu Links */}
            <div className="flex flex-col md:flex-row items-center justify-between pl-8 space-y-4 md:space-y-0 md:space-x-4 header-menu">
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
