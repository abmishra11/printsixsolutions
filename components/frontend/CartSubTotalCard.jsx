import React from "react";
import Link from "next/link";

export default function CartSubTotalCard({ subTotal }) {
  const shipping = 10;
  const tax = 0;
  const totalPrice = (
    Number(subTotal) +
    Number(shipping) +
    Number(tax)
  ).toFixed(2);
  return (
    <>
      <h2 className="text-2xl pb-3">Cart Total</h2>
      <div className="flex items-center justify-between border-b border-slate-500 pb-6">
        <span>Subtotal</span>
        <span>${subTotal}</span>
      </div>
      <div className="flex items-center justify-between pb-4 mt-2">
        <span>Tax</span>
        <span>${tax}</span>
      </div>
      <div className="flex items-center justify-between pb-4">
        <span>Shipping</span>
        <span>${shipping}</span>
      </div>
      <p className="border-b border-slate-500 pb-6 text-slate-400 font-normal">
        We only charge for shipping
      </p>
      <div className="flex items-center justify-between pb-4 py-4 font-bold">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
      <div className="mt-8">
        <Link
          href={"/checkout"}
          className="text-slate-50 rounded-lg py-3 px-6 font-normal bg-primary dark:bg-primary"
        >
          Continue to Checkout
        </Link>
      </div>
    </>
  );
}
