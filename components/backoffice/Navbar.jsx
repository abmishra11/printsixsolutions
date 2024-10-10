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
import React from "react";
import ThemeSwitcherBtn from "../ThemeSwitcherBtn";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import DashboardNotifications from "./DashboardNotifications";
import { getData } from "@/lib/getData";

export default function Navbar({ showSideBar, setShowSideBar }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 text-slate-50 h-20 py-8 fixed top-0 w-full px-8 z-50 sm:pr-[20rem]">
      <Link href={"/dashboard"} className="sm:hidden">
        PrintSix
      </Link>
      {/* { Icon } */}
      <button
        className="text-lime-700 dark:text-lime-500"
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <AlignJustify />
      </button>
      {/* { 3 Icons } */}
      <div className="flex space-x-3">
        {/* <ThemeSwitcherBtn /> */}
        <DashboardNotifications user={session?.user} />
        {status === "authenticated" && <UserAvatar user={session?.user} />}
      </div>
    </div>
  );
}
