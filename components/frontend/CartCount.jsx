"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

export default function CartCount() {
  const cartItems = useSelector((store) => store.cart);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link
      className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent rounded-lg"
      href={"/cart"}
    >
      <ShoppingCart className="text-primary" />
      <span className="sr-only">Cart</span>
      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-primary rounded-full -top-0 end-6 dark:border-primary">
        {isMounted ? cartItems.length : 0}
      </div>
    </Link>
  );
}
