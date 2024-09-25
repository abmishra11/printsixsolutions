"use client";
import Breadcrumb from "@/components/frontend/Breadcrumb";
import CartItems from "@/components/frontend/CartItems";
import CartSubTotalCard from "@/components/frontend/CartSubTotalCard";
import EmptyCart from "@/components/frontend/EmptyCart";
import React from "react";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector((store) => store.cart);
  const subTotal = cartItems
    .reduce((acc, item) => {
      return acc + item.salePrice * item.qty;
    }, 0)
    .toFixed(2);
  return (
    <div className="container mx-auto py-8">
      <Breadcrumb />
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-12 gap-6 md:gap-14">
          <div className="md:col-span-8 col-span-full">
            <CartItems cartItems={cartItems} />
          </div>
          <div className="md:col-span-4 col-span-full sm:block bg-white border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-700 text-slate-800 overflow-hidden p-5 dark:text-slate-100 font-bold">
            <CartSubTotalCard subTotal={subTotal} />
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
